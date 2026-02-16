import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResourceConsumptionDto } from './create-resource-consumption.dto';

export class CreateLineItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  unitOfMeasure: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateResourceConsumptionDto)
  labors?: CreateResourceConsumptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateResourceConsumptionDto)
  materials?: CreateResourceConsumptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateResourceConsumptionDto)
  tools?: CreateResourceConsumptionDto[];
}
