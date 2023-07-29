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
    const newClient = await this.db.create(client);

    return ClientTransformer.toResponse(newClient.toObject());
  }

  async update(id: string, client: Partial<IClient>): Promise<IClient> {
    await this.db.updateOne({_id: id}, client)

    return this.findOne(id)
  }

  async delete(id: string): Promise<IClient> {
    const clientRemoved = await this.db.findByIdAndRemove(id)
    
    return ClientTransformer.toResponse(clientRemoved.toObject());
  }
}
