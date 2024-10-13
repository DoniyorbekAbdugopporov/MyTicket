import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface HumanCategoryAttr {
  name: string;
  start_age: number;
  finish_age: number;
  gender: number;
}

@Table({ tableName: "human_category" })
export class HumanCategory extends Model<HumanCategory, HumanCategoryAttr> {
  @ApiProperty({
    example: 1,
    description: "Human Categoryning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Yoshlar",
    description: "Human Category nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 18,
    description: "Human Categoryning bosqich",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  start_age: number;

  @ApiProperty({
    example: 30,
    description: "Human Categoryning tugash qilingan yosh",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  finish_age: number;

  @ApiProperty({
    example: 1,
    description: "Human Categoryning jinsi",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  gender: number;
}
