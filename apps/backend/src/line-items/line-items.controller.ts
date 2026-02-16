import { Controller } from '@nestjs/common';
import { LineItemsService } from './line-items.service';
import { BaseController } from 'src/common/crud/base.controller';
import { LineItem } from './entities/line-item.entity';
import { CreateLineItemDto } from './dto/create-line-item.dto';
import { UpdateLineItemDto } from './dto/update-line-item.dto';

@Controller('lineItem')
export class LineItemsController extends BaseController<
  LineItem,
  CreateLineItemDto,
  UpdateLineItemDto
> {
  constructor(private readonly lineItemsService: LineItemsService) {
    super(lineItemsService);
  }
}
