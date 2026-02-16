import { Controller } from '@nestjs/common';
import { LaborTypesService } from './labor-types.service';
import { BaseController } from 'src/common/crud/base.controller';
import { LaborType } from './entities/labor-type.entity';
import { CreateLaborTypeDto } from './dto/create-labor-type.dto';
import { UpdateLaborTypeDto } from './dto/update-labor-type.dto';

@Controller('laborType')
export class LaborTypesController extends BaseController<
  LaborType,
  CreateLaborTypeDto,
  UpdateLaborTypeDto
> {
  constructor(private readonly laborTypesService: LaborTypesService) {
    super(laborTypesService);
  }
}
