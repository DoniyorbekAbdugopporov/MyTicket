import { IsString } from "class-validator";


export class CreateSeatTypeDto {
  @IsString()
  name: string;
}