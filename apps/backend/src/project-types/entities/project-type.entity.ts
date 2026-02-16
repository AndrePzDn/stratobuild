import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})
export class ProjectType extends BaseEntity {
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
    required: false,
    type: String,
    trim: true,
    lowercase: true,
  })
  color: string;
}

export const ProjectTypeSchema = SchemaFactory.createForClass(ProjectType);
