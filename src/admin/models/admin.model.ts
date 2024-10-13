import {
  Column,
  DataType,
  Model,
  Table,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import * as bcrypt from "bcrypt";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminCreationAttr {
  name: string;
  login: string;
  password: string;
  is_active?: boolean;
  is_creator?: boolean;
}

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Adminning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "admin1",
    description: "Adminning ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "login1",
    description: "Adminning logini",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @ApiProperty({
    example: "Pa$$Word1",
    description: "Adminning passwordi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Adminning activ yoki activ emasligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: "false",
    description: "Adminning creator yoki creator emasligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_creator: boolean;

  // // Add password hashing logic
  // @BeforeCreate
  // @BeforeUpdate
  // static async hashPassword(admin: Admin) {
  //   if (admin.password) {
  //     const salt = await bcrypt.genSalt(10);
  //     admin.password = await bcrypt.hash(admin.password, salt);
  //   }
  // }
}
