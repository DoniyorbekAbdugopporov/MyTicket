import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateSeatDto {
  @IsString()
  sector: string;

  @IsNumber()
  row_number: number;

  @IsNumber()
  number: number;

  @IsNumber()
  @Type(() => Number)
  venueId: number;

  @IsNumber()
  @Type(() => Number)
  seatTypeId: number;

  @IsArray()
  location_in_schema: string[];
}
