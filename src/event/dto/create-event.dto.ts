import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
  @ApiProperty({
    example: "Dizayn",
    description: "Bu yerda faqat nomi kiritiladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "https://dizayn.uz/photo.jpg",
    description: "Bu yerda faqat rasmi kiritiladi",
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    example: "2024-08-28",
    description: "Bu yerda boshlang'ich sana kiritiladi",
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: "10:00",
    description: "Bu yerda bo'lanish vaqti kiritiladi",
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    example: "2024-08-29",
    description: "Bu yerda tugash vaqti kiritiladi",
  })
  @IsDateString()
  finish_date: Date;

  @ApiProperty({
    example: "17:00",
    description: "Bu yerda tugash vaqti kiritiladi",
  })
  @IsString()
  finish_time: string;

  @ApiProperty({
    example: "Dizayn konserti",
    description: "Bu yerda konsert haqida malumot kiritiladi",
  })
  @IsString()
  info: string;

  @ApiProperty({
    example: 1,
    description: "Event type Id beriladi",
  })
  @IsNumber()
  @Type(() => Number)
  eventTypeId: number;

  @ApiProperty({
    example: 1,
    description: "Human category Id beriladi",
  })
  @IsNumber()
  @Type(() => Number)
  humanCategoryId: number;

  @ApiProperty({
    example: 1,
    description: "Venue Id beriladi",
  })
  @IsNumber()
  @Type(() => Number)
  venueId: number;

  @ApiProperty({
    example: 1,
    description: "Language Id beriladi",
  })
  @IsNumber()
  @Type(() => Number)
  languageId: number;

  @ApiProperty({
    example: "2024-08-28",
    description: "Bu yerda boshlang'ich sana kiritiladi",
  })
  // @IsDateString()
  // @Type(() => Date)
  release_date: Date;
}
