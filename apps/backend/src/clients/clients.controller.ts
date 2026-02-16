import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { BaseController } from 'src/common/crud/base.controller';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController extends BaseController<
  Client,
  CreateClientDto,
  UpdateClientDto
> {
  constructor(private readonly clientsService: ClientsService) {
    super(clientsService);
  }
}
