import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Countries as Country,
  Regions as Region,
} from './entities/country.entity';
import {
  CreateCountryDto,
  UpdateCountryDto,
  CreateRegionDto,
  UpdateRegionDto,
} from './dto/country-region.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) { }

  /* --------------------- COUNTRY --------------------- */

  async createCountry(dto: CreateCountryDto): Promise<Country> {
    const exists = await this.countryRepository.findOneBy({ name: dto.name });
    if (exists) {
      throw new BadRequestException('Country already exists');
    }
    const country = this.countryRepository.create(dto);
    return this.countryRepository.save(country);
  }

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find({ relations: ['regions'] });
  }

  async getCountryById(id: string): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { id },
      relations: ['regions'],
    });
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    return country;
  }

  async updateCountry(id: string, dto: UpdateCountryDto): Promise<Country> {
    const country = await this.getCountryById(id);
    const updated = this.countryRepository.merge(country, dto);
    return this.countryRepository.save(updated);
  }

  async deleteCountry(id: string): Promise<void> {
    const result = await this.countryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
  }

  /* --------------------- REGION ---------------------- */

  async getRegionsByCountry(countryId: string): Promise<Region[]> {
    return this.regionRepository.find({
      where: { country: { id: countryId } },
    });
  }

  async addRegion(dto: CreateRegionDto): Promise<Region> {
    const country = await this.getCountryById(dto.countryId);
    const exists = await this.regionRepository.findOne({
      where: { name: dto.name, country: { id: dto.countryId } },
    });
    if (exists) {
      throw new BadRequestException('Region already exists in this country');
    }

    const region = this.regionRepository.create({
      name: dto.name,
      country,
    });
    return this.regionRepository.save(region);
  }

  async updateRegion(regionId: string, dto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionRepository.findOne({
      where: { id: regionId },
      relations: ['country'],
    });
    if (!region) {
      throw new NotFoundException(`Region with id ${regionId} not found`);
    }
    const updated = this.regionRepository.merge(region, dto);
    return this.regionRepository.save(updated);
  }

  async deleteRegion(regionId: string): Promise<void> {
    const result = await this.regionRepository.delete(regionId);
    if (result.affected === 0) {
      throw new NotFoundException(`Region with id ${regionId} not found`);
    }
  }

  /* ------------------- SEEDING UTILS ------------------ */

  async findByName(name: string): Promise<Country | null> {
    return this.countryRepository.findOne({
      where: { name },
      relations: ['regions'],
    });
  }

  async createWithRegions(name: string, regions: string[]): Promise<Country> {
    const country = this.countryRepository.create({ name });
    const savedCountry = await this.countryRepository.save(country);

    const regionEntities = regions.map((regionName) =>
      this.regionRepository.create({ name: regionName, country: savedCountry }),
    );
    await this.regionRepository.save(regionEntities);
    return savedCountry;
  }

  async addMissingRegions(countryId: string, regions: string[]): Promise<void> {
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['regions'],
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const existing = new Set(country.regions.map((r) => r.name));
    const toAdd = regions.filter((r) => !existing.has(r));

    if (toAdd.length > 0) {
      const newRegions = toAdd.map((name) =>
        this.regionRepository.create({ name, country }),
      );
      await this.regionRepository.save(newRegions);
      console.log(`[+] Added missing regions: ${toAdd.join(', ')}`);
    } else {
      console.log('[=] All regions already exist');
    }
  }
}
