import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Bu yerda Rollar kiritiladi" })
  @IsString({ message: "String bo'lishi kerak" })
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: "ADMIN Roli malumotlari",
    description: "Bu yerda rol bo'yicha to'liq malumot yoziladi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
