import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './modules/admins/admins.module';
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule, AdminsModule, CountriesModule],
})
export class AppModule { }
