import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  seatId: number;

  @IsDecimal()
  price: number;

  @IsDecimal()
  service_fee: number;

  @IsNumber()
  ticketStatusId: number;

  @IsString()
  ticket_type: "VIP" | "GENERAL" | "SPECIAL";
}
