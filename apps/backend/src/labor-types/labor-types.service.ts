import { Injectable } from '@nestjs/common';
import { LaborType } from './entities/labor-type.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/common/crud/base.service';
import { Model } from 'mongoose';

@Injectable()
export class LaborTypesService extends BaseService<LaborType> {
  constructor(
    @InjectModel('LaborType') private readonly laborTypeModel: Model<LaborType>,
  ) {
    super(laborTypeModel);
  }
}
