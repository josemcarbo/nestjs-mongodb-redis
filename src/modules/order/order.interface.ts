export interface IOrder {
  id?: string;
  description: string;
  restaurant: string;
  client: string;
  createdAt?: Date;
  updatedAt?: Date;
}
