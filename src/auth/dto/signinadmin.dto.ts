import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignInAdminDto {
  @ApiProperty({
    example: "login1",
    description: "Foydalanuvchining logini",
  })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description:
      "Foydalanuvchining passwordi (Strong Password: Katta va kichik harf, symbol, number)",
  })
  @IsStrongPassword({ minLength: 6 })
  readonly password: string;
}
