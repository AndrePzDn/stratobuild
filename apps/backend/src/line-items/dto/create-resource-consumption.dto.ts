import { IsMongoId, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateResourceConsumptionDto {
  @IsMongoId()
  resource: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  unitPrice: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  consumption: number;
}
