import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { UnitOfMeasurement } from './entities/unit-of-measurement.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UnitOfMeasurementsService extends BaseService<UnitOfMeasurement> {
  constructor(
    @InjectModel('UnitOfMeasurement')
    private readonly unitOfMeasurementModel: Model<UnitOfMeasurement>,
  ) {
    super(unitOfMeasurementModel);
  }
}
