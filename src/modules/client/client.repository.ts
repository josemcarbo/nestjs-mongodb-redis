import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './client.schema';
import { Model } from 'mongoose';
import { IClient } from './client.interface';
import { ClientTransformer } from './client.transformer';

@Injectable()
export class ClientRepository {
  constructor(@InjectModel(Client.name) private db: Model<Client>) {}


  async findOne(id: string): Promise<IClient> {
    const client = await this.db.findById(id);
    return client && ClientTransformer.toResponse(client.toObject());
  }

  async create(client: IClient): Promise<IClient> {
    const newBoard = (await this.db.create(client)).toObject();
    return ClientTransformer.toResponse(newBoard);
  }

  async update(id: string, client: Partial<IClient>): Promise<IClient> {
    return this.db.findByIdAndUpdate(id, client).lean();
  }
}
