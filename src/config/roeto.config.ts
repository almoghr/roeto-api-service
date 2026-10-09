import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { CONFIG_DEFAULTS, CONFIG_KEYS } from './config.constants';

export interface RoetoEnvironmentConfig {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
  timeoutMs: number;
  corsOrigin: string;
  internalApiKey?: string;
}

export function loadEnvironmentFiles(): void {
  dotenv.config();
}

export const roetoConfig = registerAs('roeto', (): RoetoEnvironmentConfig => {
  loadEnvironmentFiles();

  const env = process.env;

  return {
    port: env[CONFIG_KEYS.PORT] ? parseInt(String(env[CONFIG_KEYS.PORT]), 10) : CONFIG_DEFAULTS.PORT,
    nodeEnv: env[CONFIG_KEYS.NODE_ENV] ?? CONFIG_DEFAULTS.NODE_ENV,
    baseUrl: env[CONFIG_KEYS.ROETO_BASE_URL] ?? CONFIG_DEFAULTS.ROETO_BASE_URL,
    clientId: env[CONFIG_KEYS.ROETO_CLIENT_ID],
    clientSecret: env[CONFIG_KEYS.ROETO_CLIENT_SECRET],
    timeoutMs: env[CONFIG_KEYS.ROETO_TIMEOUT_MS]
      ? parseInt(String(env[CONFIG_KEYS.ROETO_TIMEOUT_MS]), 10)
      : CONFIG_DEFAULTS.ROETO_TIMEOUT_MS,
    corsOrigin: env[CONFIG_KEYS.CORS_ORIGIN] ?? CONFIG_DEFAULTS.CORS_ORIGIN,
    internalApiKey: env[CONFIG_KEYS.INTERNAL_API_KEY],
  };
});
