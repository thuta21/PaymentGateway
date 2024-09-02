import { ConfigType, registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const dbRegToken = 'database';

export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
  }),
);

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;
