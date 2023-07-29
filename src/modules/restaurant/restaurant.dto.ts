import { ApiProperty } from "@nestjs/swagger";
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class RestaurantCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;
}

export class RestaurantUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  capacity?: number;
}

export class RestaurantFindOneParamDto {
  @ApiProperty({
    format: "mongoid",
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class RestaurantFindResponseDto {
  @ApiProperty({
    format: "mongoid",
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty({
    format: "mongoid",
  })
  clients: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class RestaurantBookingRequestDto {
  @ApiProperty({
    format: "mongoid",
  })
  @IsString()
  @IsNotEmpty()
  client: string;
}
