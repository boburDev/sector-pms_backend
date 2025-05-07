import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './env.config';
import { DataSourceOptions } from 'typeorm';

export const commonTypeOrmConfig: DataSourceOptions & TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [__dirname + '/../modules/**/*.entity.js'],
    migrations: [__dirname + '/../migrations/*.js'],
    synchronize: false,
};

export const typeOrmConfig = commonTypeOrmConfig;