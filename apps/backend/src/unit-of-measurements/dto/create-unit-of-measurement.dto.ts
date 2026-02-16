import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitOfMeasurementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}
