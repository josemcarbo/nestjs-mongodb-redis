export interface IRestaurant {
  id?: string;
  name: string;
  address?: string;
  capacity: number;
  clients?: string[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}
