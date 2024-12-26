import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePageDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    companyWebsite?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    supportUrl?: string;
}

export class UpdatePageDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsUrl()
    companyWebsite?: string;

    @IsOptional()
    @IsUrl()
    supportUrl?: string;
}