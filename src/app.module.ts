import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from './infrastructure/orm/module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OrmModule],
})
export class AppModule {}
