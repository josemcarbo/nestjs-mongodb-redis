import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { IOrder } from "./order.interface";
import { OrderRepository } from "./order.repository";
import { RedisService } from "../../shared/redis/redis.service";
import { RestaurantService } from "../restaurant/restaurant.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly redisService: RedisService,
    private readonly repository: OrderRepository
  ) {}

  async findOne(id: string): Promise<IOrder> {
    const cache = await this.redisService.get(id);

    if (cache) return JSON.parse(cache) as IOrder;

    const order = await this.repository.findOne(id);

    if (!order) throw new NotFoundException("Order not found");

    await this.redisService.set(order.id, JSON.stringify(order));

    return order;
  }

  async create(order: IOrder): Promise<IOrder> {
    await this.restaurantService.booking(order.restaurant, order.client);
    const newOrder = await this.repository.create(order);
    await this.redisService.set(
      newOrder.id,
      JSON.stringify(newOrder)
    );

    return newOrder;
  }

  async delete(id: string): Promise<IOrder> {
    const [order] = await Promise.all([
      this.repository.delete(id),
      this.redisService.del(id),
    ]);

    if (!order) throw new NotFoundException("Order not found");

    return order;
  }
}
