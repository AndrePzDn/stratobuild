import { Controller } from '@nestjs/common';
import { ProjectTypesService } from './project-types.service';
import { BaseController } from 'src/common/crud/base.controller';
import { ProjectType } from './entities/project-type.entity';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';

@Controller('projectType')
export class ProjectTypesController extends BaseController<
  ProjectType,
  CreateProjectTypeDto,
  UpdateProjectTypeDto
> {
  constructor(private readonly projectTypesService: ProjectTypesService) {
    super(projectTypesService);
  }
}
