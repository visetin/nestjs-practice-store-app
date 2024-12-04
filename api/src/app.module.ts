import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMainOptionsService } from './core/config/typeorm/main-options.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMainOptionsService,
    }),
  ],
  providers: [TypeOrmMainOptionsService, AppService],
  controllers: [AppController],
})
export class AppModule {}
