import { ConfigType, registerAs } from '@nestjs/config';

export const appRegToken = 'app';

export const AppConfig = registerAs(appRegToken, () => ({
  name: process.env.APP_NAME,
  port: parseInt(process.env.APP_PORT) || 3000,
  baseUrl: process.env.APP_BASE_URL,
  apiPrefix: process.env.APP_API_PREFIX || 'api',
}));

export type AppConfigType = ConfigType<typeof AppConfig>;
