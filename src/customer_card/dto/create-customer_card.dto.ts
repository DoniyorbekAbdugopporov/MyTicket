import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateCustomerCardDto {
  @ApiProperty({
    example: 1,
    description: "Bu yerga Customer Id raqami kiritiladi",
  })
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    example: "UzCard",
    description: "Bu yerga Customer karta nomi kiritiladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "+998944434244",
    description: "Bu yerga Customer telefon raqami kiritiladi",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "9860323465467877",
    description: "Bu yerga Customer karta raqami kiritiladi",
  })
  @IsNumberString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 2024,
    description: "Bu yerga Customer karta yili kiritiladi",
  })
  @IsInt()
  @Min(new Date().getFullYear())
  @Max(2099)
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 6,
    description: "Bu yerga Customer karta oyi kiritiladi",
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  month: number;

  @ApiProperty({
    example: "false",
    description:
      "Bu yerga Customer karta activligi kiritiladi (defaultValue: false)",
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({
    example: "false",
    description:
      "Bu yerga Customer karta asosiyligi kiritiladi (defaultValue: false)",
  })
  @IsBoolean()
  @IsOptional()
  is_main: boolean;
}
