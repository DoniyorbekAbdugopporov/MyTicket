import { IsNumber, IsString } from "class-validator";

export class AddRemoveRoleDto {
  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly role_value: string;
}
