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
import { Cart } from "../../cart/models/cart.model";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";
import { CustomerCard } from "../../customer_card/models/customer_card.model";
import { Language } from "../../language/models/language.model";

interface ICustomerCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  hashed_password: string;
  email: string;
  birth_date: Date;
  gender: number;
  languageId: number;
  hashed_refresh_token?: string;
}

@Table({ tableName: "customer", timestamps: false })
export class Customer extends Model<Customer, ICustomerCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Mijozning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Alisher",
    description: "Mijozning ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Mijozning familiyasi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: "+998946676463",
    description: "Mijozning telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: "Uzbeki$T0n",
    description: "Mijozning heshlangan passwordi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: "customer@gmail.com",
    description: "Mijozning emaili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: "1990-08-19",
    description: "Mijozning tug'ilgan sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birth_date: Date;

  @ApiProperty({
    example: 1,
    description: "Mijozning jinsi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gender: number;

  @ApiProperty({
    example: 1,
    description: "Mijozning so'lashuv tili",
  })
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token?: string;

  @BelongsTo(() => Language)
  language: Language;

  @HasMany(() => CustomerAddress)
  customer_addresses: CustomerAddress[];

  @HasMany(() => CustomerCard)
  customer_cards: CustomerCard[];

  @HasMany(() => Cart)
  carts: Cart[];
}

