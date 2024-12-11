import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConnectionOptions from './infrastructure/orm/db-connection';
import { ShopCatalogModule } from './domain/shop-catalog/shop-catalog.module';

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
    ShopCatalogModule,
  ],
})
export class AppModule {}
