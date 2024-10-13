import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { CartStatusService } from "./cart_status.service";
import { CreateCartStatusDto } from "./dto/create-cart_status.dto";
import { UpdateCartStatusDto } from "./dto/update-cart_status.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CartStatus } from "./models/cart_status.model";

@ApiTags("Cart status")
@Controller("cart-status")
export class CartStatusController {
  constructor(private readonly cartStatusService: CartStatusService) {}

  @ApiOperation({ summary: "Yanagi cart status qo'shish" })
  @ApiResponse({
    status: 200,
    description: "New Cart status",
    type: CartStatus,
  })
  @Post("create")
  async createCartStatus(
    @Res() res: Response,
    @Body() createCartStatusDto: CreateCartStatusDto
  ) {
    const cart_status =
      await this.cartStatusService.createCartStatus(createCartStatusDto);
    return res.status(HttpStatus.OK).send({
      message: `New Cart Status created successfully!`,
      data: cart_status,
    });
  }

  @ApiOperation({ summary: "Barcha cart statuslar ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Cart status",
    type: [CartStatus],
  })
  @Get("all")
  async getAllCartStatus(@Res() res: Response) {
    const data = await this.cartStatusService.getAllCardStatuses();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Cart status founded succefully`,
      data: data,
    });
  }

  @ApiOperation({ summary: "Cart statuslarni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get cart status By Id",
    type: CartStatus,
  })
  @Get(":id")
  async getCartStatusById(@Res() res: Response, @Param("id") id: string) {
    const cart_status = await this.cartStatusService.getCartStatusById(+id);
    if (!cart_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Cart status founded By Id succefully`,
      data: cart_status,
    });
  }

  @ApiOperation({ summary: "Cart statusni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Cart status By Id",
    type: CartStatus,
  })
  @Patch(":id")
  async updateCartstatusById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCartStatusDto: UpdateCartStatusDto
  ) {
    const cart_status = await this.cartStatusService.updateCartStatusById(
      +id,
      updateCartStatusDto
    );
    if (!cart_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Cart status updated By Id succefully`,
      data: cart_status,
    });
  }

  @ApiOperation({ summary: "Cart status ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Cart status By Id",
    type: CartStatus,
  })
  @Delete(":id")
  async deleteCartStatusById(@Res() res: Response, @Param("id") id: string) {
    const cart_status = await this.cartStatusService.deleteCartStatusById(+id);
    if (!cart_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Cart status deleted By Id succefully`,
      data: cart_status,
    });
  }
}
