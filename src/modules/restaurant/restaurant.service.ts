import { Injectable, NotFoundException } from '@nestjs/common';
import { IRestaurant } from './restaurant.interface';
import { RestaurantRepository } from './restaurant.repository';
import { RedisService } from '../../shared/redis/redis.service';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly redisService: RedisService,
    private readonly repository: RestaurantRepository
    ) {}

  async findOne(id: string): Promise<IRestaurant> {
    const cache = await this.redisService.get(id);

    if (cache) return JSON.parse(cache) as IRestaurant;

    const restaurant = await this.repository.findOne(id);

    if (!restaurant) throw new NotFoundException('Restaurant not found');

    await this.redisService.set(restaurant.id, JSON.stringify(restaurant));

    return restaurant;
  }

  async create(restaurant: IRestaurant): Promise<IRestaurant> {
    const newRestaurant = await this.repository.create(restaurant);
    await this.redisService.set(newRestaurant.id, JSON.stringify(newRestaurant));

    return newRestaurant
  }

  async update(id: string, restaurant: Partial<IRestaurant>): Promise<IRestaurant> {
    const restaurantUpdated = await this.repository.update(id, restaurant)
    await this.redisService.set(restaurantUpdated.id, JSON.stringify(restaurantUpdated));
    
    return restaurantUpdated
  }

  async delete(id: string): Promise<IRestaurant> {
    const [response] = await Promise.all([
      this.repository.delete(id),
      this.redisService.del(id)
    ]);

    return response;
  }
}
