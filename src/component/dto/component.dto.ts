import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateComponentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsInt()
    status?: number;

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
    @IsInt()
    status?: number;

    @IsOptional()
    @IsBoolean()
    displayUptime?: boolean;
}