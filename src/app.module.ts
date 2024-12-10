import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import bdConnectionOptions from './infrastructure/orm/db-connection';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...bdConnectionOptions,
        type: 'postgres',
        autoLoadEntities: configService.getOrThrow('ORM_POSTGRES_AUTO_LOAD'),
        synchronize: configService.getOrThrow('ORM_POSTGRES_SYNC'),
        logging: configService.getOrThrow('ORM_POSTGRES_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
