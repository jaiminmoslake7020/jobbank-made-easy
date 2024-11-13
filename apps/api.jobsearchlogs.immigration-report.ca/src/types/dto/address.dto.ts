import { IsString, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street_name: string;

  @ApiProperty()
  @IsString()
  apartment_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  province: string;
}
