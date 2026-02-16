import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { Material } from './entities/material.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MaterialsService extends BaseService<Material> {
  constructor(
    @InjectModel('Material') private readonly materialModel: Model<Material>,
  ) {
    super(materialModel);
  }
}
