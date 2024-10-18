import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateComponentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsBoolean()
    displayUptime: boolean;
}

export class UpdateComponentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsBoolean()
    displayUptime?: boolean;
}