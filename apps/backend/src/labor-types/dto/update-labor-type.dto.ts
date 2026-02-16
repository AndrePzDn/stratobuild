import { PartialType } from '@nestjs/mapped-types';
import { CreateLaborTypeDto } from './create-labor-type.dto';

export class UpdateLaborTypeDto extends PartialType(CreateLaborTypeDto) {}
