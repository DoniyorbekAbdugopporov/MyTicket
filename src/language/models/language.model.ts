import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { Event } from "../../event/models/event.model";

interface LanguageCreationAttr {
  name: string;
}

@Table({ tableName: "language", timestamps: false })
export class Language extends Model<Language, LanguageCreationAttr> {
  @ApiProperty({ example: 1, description: "Language unikal ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Uzb", description: "Tilning nomi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Event)
  events: Event[];

  @HasMany(() => Customer)
  customers: Customer[];
}
