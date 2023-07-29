import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: "" })
  address: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Clients", default: [] })
  clients: Types.ObjectId[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
