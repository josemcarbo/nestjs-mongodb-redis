import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "../../shared/shared.module";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { Client, ClientSchema } from "./client.schema";
import { ClientRepository } from "./client.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    SharedModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService],
})

export class ClientModule {}
