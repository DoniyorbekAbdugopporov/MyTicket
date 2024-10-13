import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Booking } from "../../booking/models/booking.model";
import { CartStatus } from "../../cart_status/models/cart_status.model";
import { Customer } from "../../customer/models/customer.model";
import { Ticket } from "../../ticket/models/ticket.model";

interface ICartCreationAttr {
  ticketId: number;
  customerId: number;
  createdAt?: Date;
  finishedAt?: Date;
  cartStatusId: number;
}

@Table({ tableName: "cart", timestamps: false })
export class Cart extends Model<Cart, ICartCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Cart Id auto increment",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Ticket Id raqami",
  })
  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ticketId: number;

  @ApiProperty({
    example: 1,
    description: "Customer Id raqami",
  })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @ApiProperty({
    example: new Date(),
    description: "Sana kelgan vaqti",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt?: Date;

  @ApiProperty({
    example: new Date(),
    description: "Sana tugaygan vaqti",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finishedAt?: Date;

  @ApiProperty({
    example: 1,
    description: "Cart status raqami",
  })
  @ForeignKey(() => CartStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartStatusId: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => CartStatus)
  cart_status: CartStatus;

  @HasMany(() => Booking)
  booking: Booking[];
}
