import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dbConnectionOptions } from '../config/db-connection';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  ...dbConnectionOptions,
  type: 'postgres',
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/infrastructure/typeorm/migrations/*.ts'],
  seeds: ['src/infrastructure/typeorm/seeders/*.ts'],
  factories: ['src/infrastructure/typeorm/factories/**/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);
