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
import { EventType } from "../../event_type/models/event_type.model";
import { HumanCategory } from "../../human_category/models/human_category.model";
import { Language } from "../../language/models/language.model";
import { Ticket } from "../../ticket/models/ticket.model";
import { Venue } from "../../venue/models/venue.model";

interface IEventTypeCreationAttr {
  name: string;
  photo: string;
  start_date: Date;
  start_time: string;
  finish_date: Date;
  finish_time: string;
  info: string;
  eventTypeId: number;
  humanCategoryId: number;
  venueId: number;
  languageId: number;
  release_date: Date;
}

@Table({ tableName: "event", timestamps: false })
export class Event extends Model<Event, IEventTypeCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Event unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Dizayn",
    description: "Event nomi beriladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Eventning rasmiy raslam beriladi",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Eventning boshlanish tarixi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @ApiProperty({
    example: "10:00",
    description: "Eventning boshlanish vaqti",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({
    example: "2022-01-31",
    description: "Eventning tugallanish tarixi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finish_date: Date;

  @ApiProperty({
    example: "16:00",
    description: "Eventning tugallanish vaqti",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  finish_time: string;

  @ApiProperty({
    example: "Bu event dizayn konserti",
    description: "Eventning turi",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  info: string;

  @ApiProperty({
    example: 1,
    description: "Eventning tipi",
  })
  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventTypeId: number;

  @ApiProperty({
    example: 1,
    description: "Human kategoriyasi",
  })
  @ForeignKey(() => HumanCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  humanCategoryId: number;

  @ApiProperty({
    example: 1,
    description: "Venue Id",
  })
  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  venueId: number;

  @ApiProperty({
    example: 1,
    description: "Language Id",
  })
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageId: number;

  @ApiProperty({
    example: "2022-01-01",
    description: "Eventning yaratilgan tarixi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  release_date: Date;

  @BelongsTo(() => EventType)
  event_type: EventType;

  @BelongsTo(() => HumanCategory)
  human_category: HumanCategory;

  @BelongsTo(() => Venue)
  venue: Venue;

  @BelongsTo(() => Language)
  language: Language;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
