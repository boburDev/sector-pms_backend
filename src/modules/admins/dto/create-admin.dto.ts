import { AdminRole } from "@/common/enums/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ description: 'Name of the admin', example: 'Sector Technology' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Username of the admin', example: 'sectortechnology' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Password of the admin', example: 'admin123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Role of the admin', example: 'super or admin' })
    @IsNotEmpty()
    @IsEnum(AdminRole)
    role: AdminRole;
}
