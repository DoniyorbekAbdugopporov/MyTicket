import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: number;
}
