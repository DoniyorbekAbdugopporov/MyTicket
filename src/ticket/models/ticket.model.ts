import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";
import { Event } from "../../event/models/event.model";
import { Seat } from "../../seat/models/seat.model";
import { TicketStatus } from "../../ticket_status/models/ticket_status.model";

interface ITicketCreationAttr {
  eventId: number;
  seatId: number;
  price: number;
  service_fee: number;
  ticketStatusId: number;
  ticket_type: "VIP" | "GENERAL" | "SPECIAL";
}

@Table({ tableName: "ticket", timestamps: false })
export class Ticket extends Model<Ticket, ITicketCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventId: number;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  seatId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  service_fee: number;

  @ForeignKey(() => TicketStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ticketStatusId: number;

  @Column({
    type: DataType.ENUM("VIP", "GENERAL", "SPECIAL"),
    allowNull: false,
  })
  ticket_type: "VIP" | "GENERAL" | "SPECIAL";

  @BelongsTo(() => Event)
  event: Event;

  @BelongsTo(() => Seat)
  seat: Seat;

  @BelongsTo(() => TicketStatus)
  ticket_status: TicketStatus;

  @HasMany(() => Cart)
  carts: Cart[];
}
