import { Injectable, NotFoundException } from '@nestjs/common';
import { IClient } from './client.interface';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async findOne(id: string): Promise<IClient> {
    const board = await this.repository.findOne(id);
    if (!board) throw new NotFoundException('Client not found');
    return board;
  }

  async create(client: IClient): Promise<IClient> {
    return this.repository.create(client);
  }

  async update(id: string, client: Partial<IClient>): Promise<IClient> {
    return this.repository.update(id, client);
  }
}
