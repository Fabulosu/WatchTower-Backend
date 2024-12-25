import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class ComponentOrder {
    @IsInt()
    componentId: number;

    @IsInt()
    newOrder: number;
}

export class UpdateComponentOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ComponentOrder)
    components: ComponentOrder[];
}