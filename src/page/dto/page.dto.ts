import { IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
    @IsString()
    name: string;

    @IsString()
    companyWebsite: string;

    @IsString()
    supportUrl: string;
}

export class UpdatePageDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    companyWebsite?: string;

    @IsOptional()
    @IsString()
    supportUrl?: string;
}