import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateResourceConsumptionDto } from './update-resource-consumption.dto';
import { Type } from 'class-transformer';

export class UpdateLineItemDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsMongoId()
  @IsOptional()
  unitOfMeasure?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateResourceConsumptionDto)
  labors?: UpdateResourceConsumptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateResourceConsumptionDto)
  materials?: UpdateResourceConsumptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateResourceConsumptionDto)
  tools?: UpdateResourceConsumptionDto[];
}
