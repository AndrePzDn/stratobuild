import { Module } from '@nestjs/common';
import { ProjectTypesService } from './project-types.service';
import { ProjectTypesController } from './project-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTypeSchema } from './entities/project-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectType', schema: ProjectTypeSchema },
    ]),
  ],
  controllers: [ProjectTypesController],
  providers: [ProjectTypesService],
})
export class ProjectTypesModule {}
