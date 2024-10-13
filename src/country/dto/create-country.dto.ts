import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDto {
  @ApiProperty({ example: "Uzbekistan", description: "Davlat nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
