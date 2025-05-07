import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import {
  CreateCountryDto,
  UpdateCountryDto,
  CreateRegionDto,
  UpdateRegionDto,
} from './dto/country-region.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Countries & Regions')
@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  /* ------------ COUNTRY CRUD ------------ */

  @Post('country/create')
  @ApiOperation({ summary: 'Create a new country' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({ status: 201, description: 'Country created successfully' })
  @ApiResponse({ status: 400, description: 'Country already exists' })
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.createCountry(dto);
  }

  @Get('countries')
  @ApiOperation({ summary: 'Get all countries with regions' })
  @ApiResponse({ status: 200, description: 'List of all countries with regions' })
  findAll() {
    return this.countriesService.getAllCountries();
  }

  @Get('countries/:id')
  @ApiOperation({ summary: 'Get a country by ID (with regions)' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Country found' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.countriesService.getCountryById(id);
  }

  @Patch('countries/:id')
  @ApiOperation({ summary: 'Update a country by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({ status: 200, description: 'Country updated successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.countriesService.updateCountry(id, dto);
  }

  @Delete('countries/:id')
  @ApiOperation({ summary: 'Delete a country by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Country deleted successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.countriesService.deleteCountry(id);
  }

  /* ------------ REGION CRUD ------------ */

  @Get('countries/:id/regions')
  @ApiOperation({ summary: 'Get regions of a country' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'List of regions for a country' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  getRegions(@Param('id', ParseUUIDPipe) countryId: string) {
    return this.countriesService.getRegionsByCountry(countryId);
  }

  @Post('region/create')
  @ApiOperation({ summary: 'Add a region to a country' })
  @ApiBody({ type: CreateRegionDto })
  @ApiResponse({ status: 201, description: 'Region added successfully' })
  @ApiResponse({ status: 400, description: 'Region already exists in this country' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  createRegion(@Body() dto: CreateRegionDto) {
    return this.countriesService.addRegion(dto);
  }

  @Patch('regions/:id')
  @ApiOperation({ summary: 'Update a region by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({ status: 200, description: 'Region updated successfully' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  updateRegion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRegionDto,
  ) {
    return this.countriesService.updateRegion(id, dto);
  }

  @Delete('regions/:id')
  @ApiOperation({ summary: 'Delete a region by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Region deleted successfully' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  removeRegion(@Param('id', ParseUUIDPipe) id: string) {
    return this.countriesService.deleteRegion(id);
  }
}
