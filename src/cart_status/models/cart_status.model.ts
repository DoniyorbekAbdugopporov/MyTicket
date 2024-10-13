import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";

interface CartStatusCreationAttr {
  name: string;
}

@Table({ tableName: "cart_status", timestamps: false })
export class CartStatus extends Model<CartStatus, CartStatusCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Cart status unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "status1",
    description: "Cart status nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Cart)
  carts: Cart[];
}
