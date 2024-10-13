import { IsString } from "class-validator";

export class CreateTicketStatusDto {
  @IsString()
  name: string;
}
