import { Controller } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { BaseController } from 'src/common/crud/base.controller';
import { Tool } from './entities/tool.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Controller('tool')
export class ToolsController extends BaseController<
  Tool,
  CreateToolDto,
  UpdateToolDto
> {
  constructor(private readonly toolsService: ToolsService) {
    super(toolsService);
  }
}
