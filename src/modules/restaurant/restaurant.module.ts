import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "../../shared/shared.module";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { Restaurant, RestaurantSchema } from "./restaurant.schema";
import { RestaurantRepository } from "./restaurant.repository";
import { ClientModule } from "../client/client.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    SharedModule,
    ClientModule
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository],
  exports: [RestaurantService],
})

export class RestaurantModule {}
