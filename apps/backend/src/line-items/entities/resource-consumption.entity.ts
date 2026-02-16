import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  id: false,
  _id: false,
})
export class ResourceConsumption {
  @Prop({
    requried: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  resource: string;

  @Prop({
    requried: true,
    type: Number,
  })
  unitPrice: number;

  @Prop({
    requried: true,
    type: Number,
  })
  consumption: number;

  @Prop({
    requried: false,
    type: Number,
  })
  totalCost: number;
}

export const ResourceConsumptionSchema =
  SchemaFactory.createForClass(ResourceConsumption);
