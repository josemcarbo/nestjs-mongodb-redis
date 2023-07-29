import { Injectable, NotFoundException } from '@nestjs/common';
import { IClient } from './client.interface';
import { ClientRepository } from './client.repository';
import { RedisService } from '../../shared/redis/redis.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly redisService: RedisService,
    private readonly repository: ClientRepository
    ) {}

  async findOne(id: string): Promise<IClient> {
    const cache = await this.redisService.get(id);

    if (cache) return JSON.parse(cache) as IClient;

    const client = await this.repository.findOne(id);

    if (!client) throw new NotFoundException('Client not found');

    await this.redisService.set(client.id, JSON.stringify(client));

    return client;
  }

  async create(client: IClient): Promise<IClient> {
    const newClient = await this.repository.create(client);
    await this.redisService.set(newClient.id, JSON.stringify(newClient));

    return newClient
  }

  async delete(id: string): Promise<IClient> {
    const [response] = await Promise.all([
      this.repository.delete(id),
      this.redisService.del(id)
    ]);

    return response;
  }
}
