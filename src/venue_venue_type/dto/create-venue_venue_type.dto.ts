import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateVenueVenueTypeDto {
  @IsNumber()
  @Type(() => Number)
  venueId: number;

  @IsNumber()
  @Type(() => Number)
  venueTypeId: number;
}
