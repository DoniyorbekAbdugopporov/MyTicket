import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Booking } from "../../booking/models/booking.model";

interface BookingStatusCreationAttr {
  name: string;
}

@Table({ tableName: "booking_status", timestamps: false })
export class BookingStatus extends Model<
  BookingStatus,
  BookingStatusCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Booking statusning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "bron",
    description: "Booking status chitani sotib olinganligi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Booking)
  bookings: Booking[];
}
