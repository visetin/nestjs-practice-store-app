import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConnectionOptions } from '../config/db-connection';

const dataSourceOptions: DataSourceOptions = {
  ...dbConnectionOptions,
  type: 'postgres',
  synchronize: false,
  entities: ['src/domain/**/*.entity.ts'],
  migrations: ['src/infrastructure/orm/migrations/*.ts'],
  logging: true,
};

export default new DataSource(dataSourceOptions);
