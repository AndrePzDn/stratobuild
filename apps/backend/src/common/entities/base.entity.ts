import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})
export class BaseEntity {
  @Prop({ default: false })
  removed: boolean;

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ default: false })
  deleted: boolean;
}
