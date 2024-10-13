import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Cart } from "./models/cart.model";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const createdAt = new Date();
    const finishedAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
    return this.cartModel.create({
      ...createCartDto,
      createdAt,
      finishedAt,
    });
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartModel.findByPk(id, { include: { all: true } });
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const [affectedRows, updatedCarts] = await this.cartModel.update(
      updateCartDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedRows === 0) {
      throw new Error(`Cart with id ${id} not found or no changes made`);
    }

    return updatedCarts[0];
  }

  async remove(id: number): Promise<number> {
    const deletedRows = await this.cartModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error(`Cart with id ${id} not found`);
    }
    return deletedRows;
  }
}
