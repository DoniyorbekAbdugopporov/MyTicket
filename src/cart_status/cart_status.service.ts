import { Injectable } from "@nestjs/common";
import { CreateCartStatusDto } from "./dto/create-cart_status.dto";
import { UpdateCartStatusDto } from "./dto/update-cart_status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CartStatus } from "./models/cart_status.model";

@Injectable()
export class CartStatusService {
  constructor(
    @InjectModel(CartStatus) private cartStatusModel: typeof CartStatus
  ) {}

  async createCartStatus(
    createCartStatusDto: CreateCartStatusDto
  ): Promise<CartStatus> {
    const cart_status = await this.cartStatusModel.create(createCartStatusDto);
    return cart_status;
  }

  async getAllCardStatuses(): Promise<CartStatus[]> {
    const cart_statuses = await this.cartStatusModel.findAll({
      include: { all: true },
    });
    return cart_statuses;
  }

  async getCartStatusById(id: number): Promise<CartStatus> {
    const cart_status = await this.cartStatusModel.findOne({
      where: { id },
      include: { all: true },
    });
    return cart_status;
  }

  async updateCartStatusById(
    id: number,
    updateCartStatusDto: UpdateCartStatusDto
  ): Promise<CartStatus> {
    const cart_status = this.cartStatusModel.update(updateCartStatusDto, {
      where: { id },
      returning: true,
    });
    return cart_status[1][0];
  }

  async deleteCartStatusById(id: number): Promise<number> {
    const cart_status = await this.cartStatusModel.destroy({ where: { id } });
    return cart_status;
  }
}
