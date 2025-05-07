import { PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './country-region.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
