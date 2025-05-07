import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '@/configs/env.config'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: false,
};
