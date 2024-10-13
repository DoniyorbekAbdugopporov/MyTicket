import { IsDate, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: "Cart ID to which the booking is related",
  })
  @IsNumber()
  cartId: number;

  @ApiProperty({
    example: "2024-09-26T12:00:00Z",
    description: "Date when the booking is created",
  })
  //   @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: "2024-09-26T12:15:00Z",
    description: "Date when the booking finishes",
  })
  //   @IsDate()
  finishedAt: Date;

  @ApiProperty({
    example: 2,
    description: "Status ID for the booking",
  })
  @IsNumber()
  bookingStatusId: number;
}
