import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { LineItem } from './entities/line-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLineItemDto } from './dto/create-line-item.dto';
import { UpdateLineItemDto } from './dto/update-line-item.dto';

@Injectable()
export class LineItemsService extends BaseService<LineItem> {
  constructor(
    @InjectModel('LineItem') private readonly lineItemModel: Model<LineItem>,
  ) {
    super(lineItemModel);
  }

  async create(data: CreateLineItemDto) {
    const labors = this.addTotalCostToResources(data.labors ?? []);
    const materials = this.addTotalCostToResources(data.materials ?? []);
    const tools = this.addTotalCostToResources(data.tools ?? []);
    const laborTotal = this.calculateResourceTotal(labors ?? []);
    const materialTotal = this.calculateResourceTotal(materials ?? []);
    const toolTotal = this.calculateResourceTotal(tools ?? []);
    const price = laborTotal + materialTotal + toolTotal;

    const result = await new this.lineItemModel({
      ...data,
      labors,
      materials,
      tools,
      price,
    }).save();

    return {
      success: true,
      result: result,
      message: 'Document created successfully',
    };
  }

  async update(id: string, data: UpdateLineItemDto) {
    const existing = await this.lineItemModel.findOne({
      _id: id,
      removed: false,
    });

    if (!existing) {
      throw new NotFoundException({
        success: false,
        message: 'Document not found',
        result: null,
      });
    }

    const labors = data.labors
      ? this.addTotalCostToResources(data.labors)
      : existing.labors;

    const materials = data.materials
      ? this.addTotalCostToResources(data.materials)
      : existing.materials;

    const tools = data.tools
      ? this.addTotalCostToResources(data.tools)
      : existing.tools;

    const laborTotal = this.calculateResourceTotal(labors);
    const materialTotal = this.calculateResourceTotal(materials);
    const toolTotal = this.calculateResourceTotal(tools);

    const price = laborTotal + materialTotal + toolTotal;

    const updatedData = {
      ...data,
      labors,
      materials,
      tools,
      price,
    };

    const result = await this.lineItemModel.findByIdAndUpdate(
      { _id: id, removed: false },
      updatedData,
      { new: true },
    );

    if (!result) {
      throw new NotFoundException({
        success: false,
        message: 'Document not found',
        result: null,
      });
    }

    return {
      success: true,
      result,
      message: 'Document updated successfully',
    };
  }

  private addTotalCostToResources(
    resources: Array<{ unitPrice: number; consumption: number }>,
  ): Array<{ unitPrice: number; consumption: number; totalCost: number }> {
    if (!resources || resources.length === 0) {
      return [];
    }
    return resources.map((item) => ({
      ...item,
      totalCost: item.unitPrice * item.consumption,
    }));
  }

  private calculateResourceTotal(
    resources: Array<{ totalCost: number }>,
  ): number {
    if (!resources || resources.length === 0) {
      return 0;
    }

    return resources.reduce(
      (acc: number, item: { totalCost: number }) => acc + item.totalCost,
      0,
    );
  }
}
