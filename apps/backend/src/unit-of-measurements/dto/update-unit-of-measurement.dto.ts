import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitOfMeasurementDto } from './create-unit-of-measurement.dto';

export class UpdateUnitOfMeasurementDto extends PartialType(
  CreateUnitOfMeasurementDto,
) {}
