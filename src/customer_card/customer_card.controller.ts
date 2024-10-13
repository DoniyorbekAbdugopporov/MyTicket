import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerCard } from './models/customer_card.model';

@ApiTags("Customer Card (Mijoz kartasi)")
@Controller("customer-card")
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: "Yangi mijoz kartasini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "New Customer Card create",
    type: CustomerCard,
  })
  @Post("create")
  async(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: "Barcha mijozlarning kartalari ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Customer Cards",
    type: [CustomerCard],
  })
  @Get("all")
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: "Mijoz kartasini ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Customer Card By Id",
    type: CustomerCard,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerCardService.findOne(+id);
  }

  @ApiOperation({ summary: "Mijoz kartasini ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Customer Card By Id",
    type: CustomerCard,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto
  ) {
    return this.customerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: "Mijoz kartasini ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Customer Card By Id",
    type: CustomerCard,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerCardService.remove(+id);
  }
}
