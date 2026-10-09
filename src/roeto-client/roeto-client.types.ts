export interface RoetoRequestOptions {
  token?: string;
  skipAuth?: boolean;
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface RoetoOAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RoetoCheckTokenResponse {
  valid: boolean;
  expires_in?: number;
}
