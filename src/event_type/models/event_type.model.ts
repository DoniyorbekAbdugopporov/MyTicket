import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";

interface IEventTypeCreationAttr {
  name: string;
  parentEventTypeId?: number;
}

@Table({ tableName: "event_type", timestamps: false })
export class EventType extends Model<EventType, IEventTypeCreationAttr> {
  @ApiProperty({
    example: 1,
    description: " Event Turi unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Dizayn",
    description: "Event turining nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Event turining boshqa turiningning ID raqami",
  })
  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
  })
  parentEventTypeId?: number;

  // Associations
  @BelongsTo(() => EventType)
  event_type: EventType;

  @HasMany(() => Event)
  events: Event[];
}
