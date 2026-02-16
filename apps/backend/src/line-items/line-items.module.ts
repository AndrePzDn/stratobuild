import { Module } from '@nestjs/common';
import { LineItemsService } from './line-items.service';
import { LineItemsController } from './line-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LineItemSchema } from './entities/line-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LineItem', schema: LineItemSchema }]),
  ],
  controllers: [LineItemsController],
  providers: [LineItemsService],
})
export class LineItemsModule {}
