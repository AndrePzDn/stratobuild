import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdminUser {
  @Prop({
    type: Boolean,
    default: false,
  })
  removed: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  enabled: boolean;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  surname: string;

  @Prop({
    type: String,
    trim: true,
  })
  photo: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  haveToUpdatePassword: boolean;

  @Prop({
    type: String,
    default: 'Admin',
  })
  role: string;

  @Prop({
    type: Date,
    default: new Date(),
  })
  created: Date;

  @Prop({
    type: Date,
    default: new Date(),
  })
  updated: Date;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
