import { Controller } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { BaseController } from 'src/common/crud/base.controller';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('material')
export class MaterialsController extends BaseController<
  Material,
  CreateMaterialDto,
  UpdateMaterialDto
> {
  constructor(private readonly materialsService: MaterialsService) {
    super(materialsService);
  }
}
