import { Module } from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';
import { ServiceTypesController } from './service-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceTypeSchema } from './entities/service-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ServiceType', schema: ServiceTypeSchema },
    ]),
  ],
  controllers: [ServiceTypesController],
  providers: [ServiceTypesService],
})
export class ServiceTypesModule {}
