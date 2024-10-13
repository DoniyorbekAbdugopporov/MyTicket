import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Country } from "../../country/models/country.model";
import { Customer } from "../../customer/models/customer.model";
import { District } from "../../district/models/district.model";
import { Region } from "../../region/models/region.model";

interface CustomerAddressCreationAttr {
  customerId: number;
  name: string;
  countryId: number;
  regionId: number;
  districtId: number;
  street?: string;
  house?: string;
  flat?: number;
  location?: string;
  post_index?: string;
  info?: string;
}

@Table({ tableName: "customer_address", timestamps: false })
export class CustomerAddress extends Model<
  CustomerAddress,
  CustomerAddressCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Bu yerga unikal Customer Id raqami (autoIncriment)",
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
    example: "Ali",
    description: "Bu yerga Customer ismi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Bu yerga Country Id si kiritiladi",
  })
  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  countryId: number;
  @BelongsTo(() => Country)
  country: Country;

  @ApiProperty({
    example: 1,
    description: "Bu yerga Region Id si kiritiladi",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({
    example: 1,
    description: "Bu yerga District Id si kiritiladi",
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  districtId: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({
    example: "Olmazor ko'chasi",
    description: "Bu yerga Customer ko'chasi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  street: string;

  @ApiProperty({
    example: "12-uy",
    description: "Bu yerga Customer uy nomeri kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  house: string;

  @ApiProperty({
    example: "flat",
    description: "Bu yerga Customer flat kiritiladi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  flat: number;

  @ApiProperty({
    example: "123.2134.3431,1234.234.234",
    description: "Bu yerga Customer locatsiyasi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @ApiProperty({
    example: "post index",
    description: "Bu yerga Customer post index kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  post_index: string;

  @ApiProperty({
    example: "Mijoz haqada ma'lumot",
    description: "Bu yerga Customer informatsiyasi kiritiladi",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  info: string;
}
