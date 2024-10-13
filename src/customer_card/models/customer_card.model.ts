import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";

interface CustomerCardCreationAttr {
  customerId: number;
  name: string;
  phone: string;
  number: string;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}

@Table({ tableName: "customer_card", timestamps: false })
export class CustomerCard extends Model<
  CustomerCard,
  CustomerCardCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Bu yerga Customer Card unikal Id raqami (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Bu yerga Customer Id raqami kiritiladi",
  })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({
    example: "UzCard",
    description: "Bu yerga Customer karta nomi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "+998944434244",
    description: "Bu yerga Customer telefon raqami kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @ApiProperty({
    example: "9860323465467877",
    description: "Bu yerga Customer karta raqami kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @ApiProperty({
    example: 2024,
    description: "Bu yerga Customer karta yili kiritiladi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ApiProperty({
    example: 6,
    description: "Bu yerga Customer karta oyi kiritiladi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  month: number;

  @ApiProperty({
    example: "false",
    description:
      "Bu yerga Customer karta activligi kiritiladi (defaultValue: false)",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: "false",
    description:
      "Bu yerga Customer karta asosiyligi kiritiladi (defaultValue: false)",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_main: boolean;
}
