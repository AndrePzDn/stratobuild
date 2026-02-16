import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { ServiceType } from './entities/service-type.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServiceTypesService extends BaseService<ServiceType> {
  constructor(
    @InjectModel('ServiceType')
    private readonly serviceTypeModel: Model<ServiceType>,
  ) {
    super(serviceTypeModel);
  }
}
