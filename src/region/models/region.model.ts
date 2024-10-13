import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Country } from "../../country/models/country.model";
import { District } from "../../district/models/district.model";
import { Venue } from "../../venue/models/venue.model";

interface RegionCreationAttr {
  name: string;
  countryId: number;
}

@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, RegionCreationAttr> {
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

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    // allowNull: false,
  })
  countryId: number;

  @HasMany(() => District) // ko'p districtlari bor
  districts: District[];

  @HasMany(() => Venue) // ko'p venuelari bor
  venues: Venue[];

  @BelongsTo(() => Country)
  country: Country;
}
