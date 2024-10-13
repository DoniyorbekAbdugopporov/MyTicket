import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SeatType } from "../../seat_type/models/seat_type.model";
import { Ticket } from "../../ticket/models/ticket.model";
import { Venue } from "../../venue/models/venue.model";

interface SeatCreationAttr {
  sector: string;
  row_number: number;
  number: number;
  venueId: number;
  seatTypeId: number;
  location_in_schema: string[];
}

@Table({ tableName: "seat", timestamps: false })
export class Seat extends Model<Seat, SeatCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sector: string;

  @Column({
    type: DataType.INTEGER,
  })
  row_number: number;

  @Column({
    type: DataType.INTEGER,
  })
  number: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venueId: number;

  @ForeignKey(() => SeatType)
  @Column({
    type: DataType.INTEGER,
  })
  seatTypeId: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  location_in_schema: string[];

  @BelongsTo(() => Venue)
  venue: Venue;

  @BelongsTo(() => SeatType)
  seat_type: SeatType;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
