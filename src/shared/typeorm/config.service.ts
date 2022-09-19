import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nest_db',
  username: 'admin',
  password: 'pass2word',
  entities: ['dist/modules/**/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  logging: true,
  migrationsRun: true
};

export default databaseConfig;