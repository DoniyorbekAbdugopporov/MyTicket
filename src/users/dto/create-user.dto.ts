import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "User", description: "Foydalanuvchining ismi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchining emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description:
      "Foydalanuvchining passwordi (Strong Password: Katta va kichik harf, symbol, number)",
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: "USER",
    description: "Foydalanuvchiga berilayotgan dastlabki rol",
  })
  @IsString()
  @IsNotEmpty()
  role_value: string;
}
