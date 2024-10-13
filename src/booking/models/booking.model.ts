import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";
import { BookingStatus } from "../../booking_status/models/booking_status.model";

interface IBookingCreationAttr {
  cartId: number;
  createdAt: Date;
  finishedAt: Date;
  bookingStatusId: number;
}

@Table({ tableName: "booking", timestamps: false })
export class Booking extends Model<Booking, IBookingCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finishedAt: Date;

  @ForeignKey(() => BookingStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingStatusId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => BookingStatus)
  booking_status: BookingStatus;
}
