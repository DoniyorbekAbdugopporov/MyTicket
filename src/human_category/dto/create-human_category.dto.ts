import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateHumanCategoryDto {
  @ApiProperty({
    example: "Yoshlar",
    description: "Kateqoriya nomi",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 18,
    description: "Kategoriya boshlang'ich yoshi",
    required: true,
  })
  @IsNumber()
  start_age: number;

  @ApiProperty({
    example: 65,
    description: "Kategoriya tug'ilgan yoshi",
    required: true,
  })
  @IsNumber()
  finish_age: number;

  @ApiProperty({
    example: 1,
    description: "Kategoriya jinsi",
    required: true,
  })
  @IsNumber()
  gender: number;
}