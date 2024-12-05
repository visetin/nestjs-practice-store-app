import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import connectionOptions from '../database/connection';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...connectionOptions,
        type: 'postgres',
        autoLoadEntities: configService.getOrThrow('ORM_POSTGRES_AUTO_LOAD'),
        synchronize: configService.getOrThrow('ORM_POSTGRES_SYNC'),
        logging: configService.getOrThrow('ORM_POSTGRES_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class OrmModule {}
