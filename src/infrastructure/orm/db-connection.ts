import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const connectionOptions = {
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_DB'),
};

export default connectionOptions;
