import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/crud/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService extends BaseService<Client> {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {
    super(clientModel);
  }
}
