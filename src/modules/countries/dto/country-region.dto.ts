import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

/* ---------------- COUNTRY ---------------- */

export class CreateCountryDto {
    @ApiProperty({ example: "O'zbekiston", maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) { }

/* ---------------- REGION ----------------- */

export class CreateRegionDto {
    @ApiProperty({ example: "Toshkent", maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', description: 'Country UUID' })
    @IsUUID()
    @IsNotEmpty()
    countryId: string;
}

export class UpdateRegionDto extends PartialType(CreateRegionDto) { }
