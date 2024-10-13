import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBookingStatusDto {
  @ApiProperty({ example: "Bron", description: "Ciptani oldindan bron qilgan yoki bron qilinmagan" })
  @IsString()
  name: string;
}
