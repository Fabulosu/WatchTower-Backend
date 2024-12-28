import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIncidentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    severity: string;

    @IsOptional()
    @IsDateString()
    resolvedAt?: string;

    @IsArray()
    @IsNotEmpty()
    componentIds: number[];

    @IsOptional()
    @IsNumber()
    statusCode?: number;

    @IsOptional()
    @IsString()
    statusMessage?: string;

    @IsNumber()
    @IsNotEmpty()
    pageId: number;

    // Only for maintenances
    @IsDateString()
    @IsOptional()
    scheduledAt: string;

    @IsBoolean()
    @IsOptional()
    auto_start: boolean;

    @IsBoolean()
    @IsOptional()
    auto_end: boolean;

    @IsDateString()
    @IsOptional()
    completeAt: string;
}

export class UpdateIncidentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    severity?: string;

    @IsOptional()
    @IsDateString()
    resolvedAt?: string;

    @IsOptional()
    @IsString()
    updateMessage?: string;

    @IsOptional()
    @IsNumber()
    statusCode?: number;

    @IsOptional()
    @IsArray()
    components?: { id: number; status: number }[];

    // Only for maintenances
    @IsDateString()
    @IsOptional()
    scheduledAt: string;

    @IsBoolean()
    @IsOptional()
    auto_start: boolean;

    @IsBoolean()
    @IsOptional()
    auto_end: boolean;
}