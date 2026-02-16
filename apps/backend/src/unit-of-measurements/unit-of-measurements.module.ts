import { Module } from '@nestjs/common';
import { UnitOfMeasurementsService } from './unit-of-measurements.service';
import { UnitOfMeasurementsController } from './unit-of-measurements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitOfMeasurementSchema } from './entities/unit-of-measurement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UnitOfMeasurement', schema: UnitOfMeasurementSchema },
    ]),
  ],
  controllers: [UnitOfMeasurementsController],
  providers: [UnitOfMeasurementsService],
})
export class UnitOfMeasurementsModule {}
