import { IsMongoId, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class UpdateResourceConsumptionDto {
  @IsMongoId()
  @IsOptional()
  resource: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @IsOptional()
  unitPrice: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @IsOptional()
  consumption: number;
}
