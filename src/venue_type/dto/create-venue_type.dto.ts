import { IsString } from "class-validator";

export class CreateVenueTypeDto {
  @IsString()
  name: string;
}
