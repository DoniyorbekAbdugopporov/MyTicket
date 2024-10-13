import { IsNumber } from "class-validator";

export class ActivateUserDto {
  @IsNumber()
  readonly userId: number;
}
