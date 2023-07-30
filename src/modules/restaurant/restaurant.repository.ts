import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant } from "./restaurant.schema";
import { Model } from "mongoose";
import { IRestaurant } from "./restaurant.interface";
import { RestaurantTransformer } from "./restaurant.transformer";

@Injectable()
export class RestaurantRepository {
  constructor(@InjectModel(Restaurant.name) private db: Model<Restaurant>) {}

  async findOne(id: string): Promise<IRestaurant> {
    const restaurant = await this.db.findById(id);

    return (
      restaurant && RestaurantTransformer.toResponse(restaurant.toObject())
    );
  }

  async create(restaurant: IRestaurant): Promise<IRestaurant> {
    const newRestaurant = await this.db.create(restaurant);

    return RestaurantTransformer.toResponse(newRestaurant.toObject());
  }

  async update(
    id: string,
    restaurant: Partial<IRestaurant>
  ): Promise<IRestaurant> {
    await this.db.updateOne({ _id: id }, restaurant);

    return this.findOne(id);
  }

  async delete(id: string): Promise<IRestaurant> {
    const restaurantRemoved = await this.db.findByIdAndRemove(id);

    return restaurantRemoved && RestaurantTransformer.toResponse(restaurantRemoved.toObject());
  }

  async booking(id: string, client: string): Promise<IRestaurant> {
    await this.db.updateOne(
      { _id: id },
      {
        $push: {
          clients: { $each: [client] },
        },
      }
    );
    
    return this.findOne(id);
  }

  async closeAtMidnight(): Promise<void> {
    await this.db.updateMany({ clients: { $ne: [] } }, { clients: [] });
  }
}
