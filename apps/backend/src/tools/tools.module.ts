import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolSchema } from './entities/tool.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tool', schema: ToolSchema }])],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
