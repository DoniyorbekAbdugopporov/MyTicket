import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchining emaili",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description:
      "Foydalanuvchining passwordi (Strong Password: Katta va kichik harf, symbol, number)",
  })
  @IsStrongPassword({ minLength: 6 })
  readonly password: string;
}
