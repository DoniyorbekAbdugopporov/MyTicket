import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({ example: "Alisher", description: "Mijozning ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Valiey",
    description: "Mijozning familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "+998946676463",
    description: "Mijozning telefon raqami",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "Uzbeki$T0n",
    description: "Mijozning passwordi",
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  hashed_password: string;

  @ApiProperty({
    example: "customer@gmail.com",
    description: "Mijozning emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1990-08-16",
    description: "Mijozning tug'ilgan sanasi",
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty({
    example: 1,
    description: "Mijozning jinsi",
  })
  @IsInt()
  gender: number;

  @ApiProperty({
    example: 1,
    description: "Mijozning so'zlashuv tili",
  })
  @IsNumber()
  @Type(() => Number)
  languageId: number;

  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;
}
