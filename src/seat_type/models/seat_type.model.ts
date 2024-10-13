import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Seat } from "../../seat/models/seat.model";

interface SeatTypeAttr {
  name: string;
}

@Table({ tableName: "seat-type" })
export class SeatType extends Model<SeatType, SeatTypeAttr> {
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
  name: string;

  @HasMany(() => Seat)
  seat: Seat[]
}
