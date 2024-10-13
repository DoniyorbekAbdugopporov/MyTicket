import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";
import { Region } from "../../region/models/region.model";

interface ICountryCreationAttr {
  name: string;
}

@Table({ tableName: "country", timestamps: false })
export class Country extends Model<Country, ICountryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Davlatning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Uzbekistan",
    description: "Davlatning nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => CustomerAddress)
  customer_addresses: CustomerAddress[];

  // @HasMany(() => Region)
  // regions: Region[];
}
