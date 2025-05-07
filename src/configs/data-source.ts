import 'dotenv/config';
import { DataSource } from 'typeorm';
import { commonTypeOrmConfig } from './typeorm.config';

export default new DataSource({
    ...commonTypeOrmConfig,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});
