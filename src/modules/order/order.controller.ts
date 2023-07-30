import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import {
  OrderCreateRequestDto,
  OrderFindOneParamDto,
  OrderFindResponseDto,
} from "./order.dto";
import { OrderService } from "./order.service";
import { IOrder } from "./order.interface";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OrderFindResponseDto })
  @ApiOperation({ description: "Get one order" })
  @Get("/:id")
  findOne(@Param() { id }: OrderFindOneParamDto): Promise<IOrder> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OrderFindResponseDto })
  @ApiOperation({ description: "Create a order" })
  @Post()
  create(@Body() order: OrderCreateRequestDto): Promise<IOrder> {
    return this.service.create(order);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: OrderFindResponseDto })
  @ApiOperation({ description: "Delete one order" })
  @Delete("/:id")
  delete(@Param() { id }: OrderFindOneParamDto): Promise<IOrder> {
    return this.service.delete(id);
  }
}
