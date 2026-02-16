import { Injectable } from '@nestjs/common';
import { ProjectType } from './entities/project-type.entity';
import { BaseService } from 'src/common/crud/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectTypesService extends BaseService<ProjectType> {
  constructor(
    @InjectModel('ProjectType')
    private readonly projectTypeModel: Model<ProjectType>,
  ) {
    super(projectTypeModel);
  }
}
