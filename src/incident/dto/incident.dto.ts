import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsString()
    status?: string;
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
    status?: string;

    @IsOptional()
    @IsString()
    updateMessage?: string;

    @IsOptional()
    @IsNumber()
    statusCode?: number;
}