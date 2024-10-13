import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerAddressDto {
  @ApiProperty({
    example: 1,
    description: "Bu yerga Customer Id raqami kiritiladi",
  })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    example: "Ali",
    description: "Bu yerga Customer ismi kiritiladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Bu yerga Country Id si kiritiladi",
  })
  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @ApiProperty({
    example: 1,
    description: "Bu yerga Region Id si kiritiladi",
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 1,
    description: "Bu yerga District Id si kiritiladi",
  })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    example: "Olmazor ko'chasi",
    description: "Bu yerga Customer ko'chasi kiritiladi",
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({
    example: "12-uy",
    description: "Bu yerga Customer uy nomeri kiritiladi",
  })
  @IsOptional()
  @IsString()
  house?: string;

  @ApiProperty({
    example: "flat",
    description: "Bu yerga Customer flat kiritiladi",
  })
  @IsOptional()
  @IsNumber()
  flat?: number;

  @ApiProperty({
    example: "123.2134.3431,1234.234.234",
    description: "Bu yerga Customer locatsiyasi kiritiladi",
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    example: "post index",
    description: "Bu yerga Customer post index kiritiladi",
  })
  @IsOptional()
  @IsString()
  post_index?: string;

  @ApiProperty({
    example: "Mijoz haqada ma'lumot",
    description: "Bu yerga Customer informatsiyasi kiritiladi",
  })
  @IsOptional()
  @IsString()
  info?: string;
}
