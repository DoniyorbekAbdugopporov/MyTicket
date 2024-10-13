import { IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty({
    example: 1,
    description: "Ticket ID to which the booking is related",
  })
  @IsNumber()
  ticketId: number;

  @ApiProperty({
    example: 1,
    description: "Customer ID to which the booking is related",
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    example: "2024-09-26T12:00:00Z",
    description: "Date when the booking finishes",
  })
  //   @Type(() => Date)
  //   @IsDate()
  createdAt?: Date;

  @ApiProperty({
    example: "2024-09-26T12:15:00Z",
    description: "Date when the booking is created",
  })
  //   @Type(() => Date)
  //   @IsDate()
  finishedAt?: Date;

  @ApiProperty({
    example: 1,
    description: "Cart status ID",
  })
  @IsNumber()
  cartStatusId: number;
}
