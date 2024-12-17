import { NestFactory, Reflector } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infrastructure/interceptors/response.interceptor';
import { applyOpenapiBuilder } from './infrastructure/openapi';

const applyGlobalInterceptors = (app: INestApplication) => {
  const appReflector = app.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(appReflector));
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  applyGlobalInterceptors(app);
  applyOpenapiBuilder(app);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
