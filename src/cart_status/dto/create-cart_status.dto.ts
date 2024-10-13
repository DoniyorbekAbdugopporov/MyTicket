import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCartStatusDto {
  @ApiProperty({ example: "panding", description: "Cart status" })
  @IsString()
  name: string;
}
