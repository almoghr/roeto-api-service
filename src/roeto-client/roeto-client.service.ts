import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { API_CONSTANTS, ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoApiException } from '../common/errors/roeto-api.exception';
import { RoetoEnvironmentConfig } from '../config/roeto.config';
import { RoetoOAuthTokenResponse, RoetoRequestOptions } from './roeto-client.types';

@Injectable()
export class RoetoClientService {
  private readonly logger = new Logger(RoetoClientService.name);
  private readonly http: AxiosInstance;
  private cachedToken?: string;
  private tokenExpiresAt = 0;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<RoetoEnvironmentConfig>('roeto');
    const timeout = config?.timeoutMs ?? API_CONSTANTS.DEFAULT_TIMEOUT_MS;

    this.http = axios.create({
      timeout,
      headers: {
        [API_CONSTANTS.HEADER_CONTENT_TYPE]: API_CONSTANTS.CONTENT_TYPE_JSON,
      },
    });
  }

  /**
   * Resolves a valid Bearer token either from options or through cached OAuth2 client credentials.
   */
  async getOrFetchToken(overrideToken?: string): Promise<string | undefined> {
    if (overrideToken) {
      return overrideToken;
    }

    const now = Date.now();
    if (this.cachedToken && this.tokenExpiresAt > now + 60000) {
      return this.cachedToken;
    }

    const config = this.configService.get<RoetoEnvironmentConfig>('roeto');
    if (!config?.clientId || !config?.clientSecret) {
      return undefined;
    }

    try {
      this.logger.debug('Minting fresh OAuth2 token from Roeto...');
      const authHeader = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
      const baseUrl = config.baseUrl || API_CONSTANTS.DEFAULT_BASE_URL;
      const url = `${baseUrl}${ROETO_ENDPOINTS.OAUTH_TOKEN}`;

      const res = await this.http.post<RoetoOAuthTokenResponse>(
        url,
        { grant_type: 'client_credentials' },
        {
          headers: {
            [API_CONSTANTS.HEADER_AUTHORIZATION]: `${API_CONSTANTS.BASIC_HEADER_PREFIX}${authHeader}`,
            [API_CONSTANTS.HEADER_CONTENT_TYPE]: API_CONSTANTS.CONTENT_TYPE_JSON,
          },
        },
      );

      this.cachedToken = res.data.access_token;
      this.tokenExpiresAt = Date.now() + (res.data.expires_in ?? 3600) * 1000;
      this.logger.log('Successfully minted fresh OAuth2 token from Roeto');
      return this.cachedToken;
    } catch (error) {
      this.logger.error('Failed to obtain OAuth2 token from Roeto:', error);
      return undefined;
    }
  }

  /**
   * Generic GET request to Roeto API.
   */
  async get<T>(path: string, params?: Record<string, unknown>, options?: RoetoRequestOptions): Promise<T> {
    return this.request<T>({ method: 'GET', url: path, params }, options);
  }

  /**
   * Generic POST request to Roeto API.
   */
  async post<T>(path: string, data?: unknown, options?: RoetoRequestOptions): Promise<T> {
    return this.request<T>({ method: 'POST', url: path, data }, options);
  }

  /**
   * Generic PUT request to Roeto API.
   */
  async put<T>(path: string, data?: unknown, options?: RoetoRequestOptions): Promise<T> {
    return this.request<T>({ method: 'PUT', url: path, data }, options);
  }

  /**
   * Core request dispatcher with retry and error translation.
   */
  private async request<T>(axiosConfig: AxiosRequestConfig, options?: RoetoRequestOptions): Promise<T> {
    const config = this.configService.get<RoetoEnvironmentConfig>('roeto');
    const baseUrl = config?.baseUrl ?? API_CONSTANTS.DEFAULT_BASE_URL;
    const url = axiosConfig.url?.startsWith('http') ? axiosConfig.url : `${baseUrl}${axiosConfig.url}`;

    const headers: Record<string, string> = {
      ...(axiosConfig.headers as Record<string, string>),
      ...options?.headers,
    };

    if (!options?.skipAuth) {
      const token = await this.getOrFetchToken(options?.token);
      if (token) {
        headers[API_CONSTANTS.HEADER_AUTHORIZATION] = `${API_CONSTANTS.AUTH_HEADER_PREFIX}${token}`;
      }
    }

    const maxRetries = options?.retries ?? API_CONSTANTS.DEFAULT_MAX_RETRIES;
    const timeout = options?.timeoutMs ?? config?.timeoutMs ?? API_CONSTANTS.DEFAULT_TIMEOUT_MS;

    let attempt = 0;
    while (attempt <= maxRetries) {
      try {
        const response: AxiosResponse<T> = await this.http.request<T>({
          ...axiosConfig,
          url,
          headers,
          timeout,
        });

        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          const status = error.response?.status ?? 500;
          const data = error.response?.data as Record<string, unknown> | undefined;

          // Do not retry 4xx errors
          if (status >= 400 && status < 500) {
            throw new RoetoApiException(
              {
                statusCode: status,
                message: (data?.message as string) ?? error.message,
                operation: axiosConfig.url,
                error: (data?.error as string) ?? error.code,
                errors: data?.errors as unknown[],
                rawResponse: data,
              },
              status,
            );
          }
        }

        const isLastAttempt = attempt >= maxRetries;
        if (isLastAttempt) {
          const err = error as Error;
          this.logger.error(`Roeto API request to [${url}] failed after ${attempt + 1} attempts: ${err.message}`);
          throw new RoetoApiException({
            statusCode: 502,
            message: `Network or transport error contacting Roeto: ${err.message}`,
            operation: axiosConfig.url,
            rawResponse: error,
          });
        }

        attempt++;
        const backoffDelay = API_CONSTANTS.RETRY_INITIAL_DELAY_MS * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      }
    }

    throw new RoetoApiException({
      statusCode: 500,
      message: 'Retry exhaustion communicating with Roeto',
      operation: axiosConfig.url,
    });
  }
}
