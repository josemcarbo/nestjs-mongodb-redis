import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Restaurant" })
  restaurant: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Client" })
  client: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
