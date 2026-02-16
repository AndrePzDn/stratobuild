import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  ResourceConsumption,
  ResourceConsumptionSchema,
} from './resource-consumption.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})
export class LineItem extends BaseEntity {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UnitOfMeasurement',
  })
  unitOfMeasure: string;

  @Prop({
    requried: false,
    type: Number,
  })
  price: number;

  @Prop({
    type: [
      {
        ...ResourceConsumptionSchema.obj,
        resource: {
          requried: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'laborType',
        },
      },
    ],
    default: [],
  })
  labors: ResourceConsumption[];

  @Prop({
    type: [
      {
        ...ResourceConsumptionSchema.obj,
        resource: {
          requried: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'material',
        },
      },
    ],
    default: [],
  })
  materials: ResourceConsumption[];

  @Prop({
    type: [
      {
        ...ResourceConsumptionSchema.obj,
        resource: {
          requried: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tool',
        },
      },
    ],
    default: [],
  })
  tools: ResourceConsumption[];
}

export const LineItemSchema = SchemaFactory.createForClass(LineItem);
