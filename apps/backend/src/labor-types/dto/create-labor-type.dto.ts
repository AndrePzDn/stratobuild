import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLaborTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  unitOfMeasurement: string;
}
