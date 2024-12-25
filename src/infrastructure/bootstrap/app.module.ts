import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectionOptions } from '../config/db-connection';
import { ProductsCatalogModule } from './modules/products-catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...dbConnectionOptions,
        type: 'postgres',
        autoLoadEntities: configService.getOrThrow('ORM_POSTGRES_AUTO_LOAD'),
        synchronize: configService.getOrThrow('ORM_POSTGRES_SYNC'),
        logging: configService.getOrThrow('ORM_POSTGRES_LOGGING'),
      }),
      inject: [ConfigService],
    }),
    ProductsCatalogModule,
  ],
})
export class AppModule {}
