import { DataSource } from 'typeorm';
import databaseConfig from './config.service';

export const AppDataSource = new DataSource(databaseConfig);