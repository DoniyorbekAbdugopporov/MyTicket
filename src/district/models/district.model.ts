import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Venue } from "../../venue/models/venue.model";

interface DistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, DistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Districtning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Shahrisabz",
    description: "Districtning nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Districtning boshqa regionning ID raqami",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Venue) // ko'p venuelari bor
  venue: Venue[];
}
