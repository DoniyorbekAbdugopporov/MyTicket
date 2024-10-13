import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './models/cart.model';

@ApiTags("Cart")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Create new cart" })
  @ApiResponse({
    status: 201,
    description: "New Cart",
    type: Cart,
  })
  @Post("create")
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: "Get all carts" })
  @ApiResponse({ 
    status: 200,
    description: "List of Carts",
    type: [Cart],
  })
  @Get("all")
  async findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: "Get cart by id" })
  @ApiResponse({
    status: 200,
    description: "Cart by id",
    type: Cart,
  })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({ summary: "Update cart by id" })
  @ApiResponse({
    status: 200,
    description: "Update Cart By Id",
    type: Cart,
  })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: "Delete cart by id" })
  @ApiResponse({
    status: 200,
    description: "Delete Cart By Id",
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.cartService.remove(+id);
  }
}
