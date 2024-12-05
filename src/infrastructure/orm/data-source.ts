import { DataSource, DataSourceOptions } from 'typeorm';
import connectionOptions from '../database/connection';

const dataSourceOptions: DataSourceOptions = {
  ...connectionOptions,
  type: 'postgres',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/orm/migrations/*.ts'],
  logging: true,
};

export default new DataSource(dataSourceOptions);
