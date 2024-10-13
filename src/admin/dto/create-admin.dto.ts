import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "ADMIN",
    description: "Bu yerda Admin ismi",
  })
  @IsString()
  @IsNotEmpty({ message: "Name field should not be empty" })
  name: string;

  @ApiProperty({
    example: "login",
    description: "Bu yerda Admin login",
  })
  @IsString()
  @IsNotEmpty({ message: "Login field should not be empty" })
  login: string;

  @ApiProperty({
    example: "Pa$$word1",
    description:
      "Adminning passwordi (Strong Password: Katta va kichik harf, symbol, number)",
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Bu yerda Admin activ yoki activ emas",
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    example: "false",
    description: "Bu yerda Admin creator yoki creator emas",
  })
  @IsBoolean()
  @IsOptional()
  is_creator?: boolean;
}
