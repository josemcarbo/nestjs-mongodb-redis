import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RestaurantCreateRequestDto, RestaurantFindOneParamDto, RestaurantFindResponseDto, RestaurantUpdateRequestDto } from "./restaurant.dto";
import { RestaurantService } from "./restaurant.service";
import { IRestaurant } from "./restaurant.interface";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RestaurantFindResponseDto })
  @ApiOperation({ description: "Get one restaurant" })
  @Get("/:id")
  findOne(@Param() { id }: RestaurantFindOneParamDto): Promise<IRestaurant> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RestaurantFindResponseDto })
  @ApiOperation({ description: "Create a restaurant" })
  @Post()
  create(@Body() restaurant: RestaurantCreateRequestDto): Promise<IRestaurant> {
    return this.service.create(restaurant);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RestaurantFindResponseDto })
  @ApiOperation({ description: "Update one restaurant" })
  @Patch("/:id")
  update(@Param() { id }: RestaurantFindOneParamDto, @Body() restaurant: RestaurantUpdateRequestDto): Promise<IRestaurant> {
    return this.service.update(id, restaurant);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RestaurantFindResponseDto })
  @ApiOperation({ description: "Delete one restaurant" })
  @Delete("/:id")
  delete(@Param() { id }: RestaurantFindOneParamDto): Promise<IRestaurant> {
    return this.service.delete(id);
  }
}
