import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { CheckTokenResponseDto, OAuthTokenDto, OAuthTokenResponseDto } from './dto/oauth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  /**
   * Exchange client credentials for a signed Roeto JWT.
   */
  async getToken(dto: OAuthTokenDto, basicAuthHeader?: string): Promise<OAuthTokenResponseDto> {
    const headers: Record<string, string> = {};
    if (basicAuthHeader) {
      headers['Authorization'] = basicAuthHeader;
    }

    return this.roetoClient.post<OAuthTokenResponseDto>(
      ROETO_ENDPOINTS.OAUTH_TOKEN,
      dto,
      { skipAuth: true, headers },
    );
  }

  /**
   * Check if provided JWT is valid and not expired.
   */
  async checkToken(bearerToken?: string): Promise<CheckTokenResponseDto> {
    return this.roetoClient.get<CheckTokenResponseDto>(
      ROETO_ENDPOINTS.OAUTH_CHECK_TOKEN,
      undefined,
      { token: bearerToken },
    );
  }
}
