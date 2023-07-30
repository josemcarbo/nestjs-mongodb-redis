import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "../../shared/shared.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order, OrderSchema } from "./order.schema";
import { OrderRepository } from "./order.repository";
import { RestaurantModule } from "../restaurant/restaurant.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
    SharedModule,
    RestaurantModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})

export class OrderModule {}
