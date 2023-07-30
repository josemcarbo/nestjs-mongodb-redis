import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./order.schema";
import { Model } from "mongoose";
import { IOrder } from "./order.interface";
import { OrderTransformer } from "./order.transformer";

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private db: Model<Order>) {}

  async findOne(id: string): Promise<IOrder> {
    const order = await this.db.findById(id);

    return (
      order && OrderTransformer.toResponse(order.toObject())
    );
  }

  async create(order: IOrder): Promise<IOrder> {
    const newOrder = await this.db.create(order);

    return OrderTransformer.toResponse(newOrder.toObject());
  }

  async delete(id: string): Promise<IOrder> {
    const orderRemoved = await this.db.findByIdAndRemove(id);

    return orderRemoved && OrderTransformer.toResponse(orderRemoved.toObject());
  }
}
