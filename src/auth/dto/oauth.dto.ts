import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class OAuthTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['client_credentials'])
  grant_type!: string;
}

export class OAuthTokenResponseDto {
  access_token!: string;
  token_type!: string;
  expires_in!: number;
}

export class CheckTokenResponseDto {
  valid!: boolean;
  expires_in?: number;
}
