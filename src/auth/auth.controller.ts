import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckTokenResponseDto, OAuthTokenDto, OAuthTokenResponseDto } from './dto/oauth.dto';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  async getToken(
    @Body() dto: OAuthTokenDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<OAuthTokenResponseDto> {
    return this.authService.getToken(dto, authHeader);
  }

  @Get('check-token')
  async checkToken(@Headers('authorization') authHeader?: string): Promise<CheckTokenResponseDto> {
    const token = authHeader?.replace(/^Bearer\s+/i, '');
    return this.authService.checkToken(token);
  }
}
