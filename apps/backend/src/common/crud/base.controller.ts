import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { AuthGuard } from 'src/authentication/guards/auth.guard';
import type { PaginationQuery } from '../interfaces/pagination-query.interface';

export class BaseController<T> {
  constructor(protected readonly service: BaseService<T>) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: Partial<T>) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.service.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<T>) {
    return this.service.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
