import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoetoEnvironmentConfig } from './config/roeto.config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): Record<string, unknown> {
    const config = this.configService.get<RoetoEnvironmentConfig>('roeto');
    return {
      status: 'ok',
      service: 'roeto-api-service',
      version: '1.0.0',
      environment: config?.nodeEnv ?? 'development',
      roetoBaseUrl: config?.baseUrl ?? 'https://api.roeto.co.il/api/v1',
      timestamp: new Date().toISOString(),
      message_he: 'המערכת פועלת כסדרה',
    };
  }
}
