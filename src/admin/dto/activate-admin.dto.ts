import { IsNumber } from "class-validator";

export class ActivateAdminDto {
  @IsNumber()
  readonly adminId: number;
}
