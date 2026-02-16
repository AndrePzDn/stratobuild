import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { Tool } from './entities/tool.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ToolsService extends BaseService<Tool> {
  constructor(@InjectModel('Tool') private readonly toolModel: Model<Tool>) {
    super(toolModel);
  }
}
