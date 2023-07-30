import { ApiProperty } from "@nestjs/swagger";
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class OrderCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    format: "mongoid",
  })
  @IsMongoId()
  @IsNotEmpty()
  client: string;

  @ApiProperty({
    format: "mongoid",
  })
  @IsMongoId()
  @IsNotEmpty()
  restaurant: string;
}

export class OrderFindOneParamDto {
  @ApiProperty({
    format: "mongoid",
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class OrderFindResponseDto {
  @ApiProperty()
  description: string;

  @ApiProperty({
    format: "mongoid",
  })
  client: string;

  @ApiProperty({
    format: "mongoid",
  })
  restaurant: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
