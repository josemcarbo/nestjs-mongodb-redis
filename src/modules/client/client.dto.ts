import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class ClientCreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @Min(18)
  age: number;
}

export class ClientFindOneParamDto {
  @ApiProperty({
    format: 'mongoid',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class ClientFindResponseDto {
  @ApiProperty({
    format: 'mongoid',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
