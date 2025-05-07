import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries, Regions } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Countries, Regions])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
