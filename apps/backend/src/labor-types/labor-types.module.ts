import { Module } from '@nestjs/common';
import { LaborTypesService } from './labor-types.service';
import { LaborTypesController } from './labor-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LaborTypeSchema } from './entities/labor-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LaborType', schema: LaborTypeSchema }]),
  ],
  controllers: [LaborTypesController],
  providers: [LaborTypesService],
})
export class LaborTypesModule {}
