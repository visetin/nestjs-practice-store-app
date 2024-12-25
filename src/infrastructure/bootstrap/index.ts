import { NestFactory, Reflector } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { applyOpenapiBuilder } from '../openapi';

const applyGlobalPipes = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};

const applyGlobalInterceptors = (app: INestApplication) => {
  const appReflector = app.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(appReflector));
};

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  applyGlobalPipes(app);
  applyGlobalInterceptors(app);
  applyOpenapiBuilder(app);

  await app.listen(configService.getOrThrow('PORT'));
}
