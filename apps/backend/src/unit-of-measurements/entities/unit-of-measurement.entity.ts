import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})
export class UnitOfMeasurement extends BaseEntity {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: String,
  })
  symbol: string;
}

export const UnitOfMeasurementSchema =
  SchemaFactory.createForClass(UnitOfMeasurement);
