import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIncidentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    severity: string;

    @IsDateString()
    @IsOptional()
    scheduleAt: string;

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
    scheduleAt?: string;

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
}