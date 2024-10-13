import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventTypeDto {
  @ApiProperty({ example: "Dizayn", description: "Ticket type name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Parent event type type ID",
  })
  @IsNumber()
  @Type(() => Number)
  parentEventTypeId?: number;
}
