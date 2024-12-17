import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const applyOpenapiBuilder = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get('OPENAPI_TITLE'))
    .setDescription(configService.get('OPENAPI_DESCRIPTION'))
    .setVersion(configService.get('OPENAPI_VERSION', '0.0.1'))
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    configService.get('OPENAPI_PATH', 'docs'),
    app,
    documentFactory,
  );
};
