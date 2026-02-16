import { Controller } from '@nestjs/common';
import { UnitOfMeasurementsService } from './unit-of-measurements.service';
import { BaseController } from 'src/common/crud/base.controller';
import { UnitOfMeasurement } from './entities/unit-of-measurement.entity';
import { CreateUnitOfMeasurementDto } from './dto/create-unit-of-measurement.dto';
import { UpdateUnitOfMeasurementDto } from './dto/update-unit-of-measurement.dto';

@Controller('unitOfMeasurement')
export class UnitOfMeasurementsController extends BaseController<
  UnitOfMeasurement,
  CreateUnitOfMeasurementDto,
  UpdateUnitOfMeasurementDto
> {
  constructor(
    private readonly unitOfMeasurementsService: UnitOfMeasurementsService,
  ) {
    super(unitOfMeasurementsService);
  }
}
