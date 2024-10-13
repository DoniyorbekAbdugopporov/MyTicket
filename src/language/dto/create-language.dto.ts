import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({
    example: "Uzbek",
    description: "Language name",
    required: true,
  })
  @IsString()
  name: string;
}
