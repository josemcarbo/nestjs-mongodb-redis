import { Module } from "@nestjs/common";
import { ClientModule } from "./client/client.module";
import { RestaurantModule } from "./restaurant/restaurant.module";

@Module({
  imports: [ClientModule, RestaurantModule],
})

export class ApiModule {}
