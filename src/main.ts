import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType, AppConfigType } from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, apiPrefix } = app
    .get(ConfigService<AllConfigType>)
    .get<AppConfigType>('app');

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(port);
  console.log(`Backend is ready! HTTP port is running in ${port}`);
}

bootstrap();
