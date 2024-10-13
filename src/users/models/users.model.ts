import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Roles } from "../../roles/models/roles.model";
import { UserRoles } from "./users-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUsersCreationAttr {
  name: string;
  email: string;
  password: string;
  role_value: string;
}

@Table({ tableName: "users" })
export class Users extends Model<Users, IUsersCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchining ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "user@Gmail.com",
    description: "Foydalanuvchining emaili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: "Uzbek!st0n",
    description: "Foydalanuvchining passwordi",
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: "USER",
    description: "Foydalanuvchining astlabki roli",
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  role_value: string;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchining activligi default false",
  })
  @Column({
    type: DataType.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}
