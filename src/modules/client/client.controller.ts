import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  ClientCreateRequestDto,
  ClientFindOneParamDto,
  ClientFindResponseDto,
} from "./client.dto";
import { ClientService } from "./client.service";
import { IClient } from "./client.interface";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Clients")
@Controller("clients")
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ClientFindResponseDto })
  @ApiOperation({ description: "Get one client" })
  @Get("/:id")
  findOne(@Param() { id }: ClientFindOneParamDto): Promise<IClient> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ClientFindResponseDto })
  @ApiOperation({ description: "Create a client" })
  @Post()
  create(@Body() client: ClientCreateRequestDto): Promise<IClient> {
    return this.service.create(client);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ClientFindResponseDto })
  @ApiOperation({ description: "Get one client" })
  @Delete("/:id")
  delete(@Param() { id }: ClientFindOneParamDto): Promise<IClient> {
    return this.service.delete(id);
  }
}
