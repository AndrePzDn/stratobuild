import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class AdminPassword {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true,
    unique: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  salt: string;

  @Prop({
    type: [String],
    default: [],
  })
  loggedSessions: string[];
}

export const AdminPasswordSchema = SchemaFactory.createForClass(AdminPassword);
