import { Controller } from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';
import { BaseController } from 'src/common/crud/base.controller';
import { ServiceType } from './entities/service-type.entity';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';

@Controller('serviceType')
export class ServiceTypesController extends BaseController<
  ServiceType,
  CreateServiceTypeDto,
  UpdateServiceTypeDto
> {
  constructor(private readonly serviceTypesService: ServiceTypesService) {
    super(serviceTypesService);
  }
}
