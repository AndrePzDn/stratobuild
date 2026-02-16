import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})
export class Client extends BaseEntity {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  phone: string;

  @Prop({
    required: true,
    type: String,
  })
  country: string;

  @Prop({
    required: true,
    type: String,
  })
  address: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
  })
  createdBy: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
