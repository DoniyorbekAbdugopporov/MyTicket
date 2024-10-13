import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateVenueDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  location: string;

  @IsString()
  site: string;

  @IsString()
  phone: string;

  @IsArray()
  schema: string[];

  @IsNumber()
  regionId: number;

  @IsNumber()
  districtId: number;
}
