import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVenuePhotoDto {
  @IsNumber()
  @Type(() => Number)
  venueId: number;

  @IsString()
  @IsOptional()
  url: string;
}
