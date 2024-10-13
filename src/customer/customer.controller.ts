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
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Customer } from "./models/customer.model";

@ApiTags("Customer (Mijozlar)")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: "Yangi mijoz qo'shish" })
  @ApiResponse({
    status: 201,
    description: "New Customer",
    type: Customer,
  })
  @Post("create")
  async createCustomer(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    const customer =
      await this.customerService.createCustomer(createCustomerDto);
    return res.status(HttpStatus.OK).send({
      message: `New Customer created successfully!`,
      data: customer,
    });
  }

  @ApiOperation({ summary: "Barcha mijozlarning ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Customer",
    type: [Customer],
  })
  @Get("all")
  async getAllCustomers(@Res() res: Response) {
    const customers = await this.customerService.getAllCustomers();
    if (!customers) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Customers founded succefully`,
      data: customers,
    });
  }

  @ApiOperation({ summary: "Mijozni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Customer By Id",
    type: Customer,
  })
  @Get(":id")
  async getCustomerById(@Res() res: Response, @Param("id") id: string) {
    const customer = await this.customerService.getCustomerById(+id);
    if (!customer) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Customer founded By Id successfuly!`,
      data: customer,
    });
  }

  @ApiOperation({ summary: "Mijozni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Customer By Id",
    type: Customer,
  })
  @Patch(":id")
  async updateCustomerById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const customer = await this.customerService.updateCustomerById(
      +id,
      updateCustomerDto
    );
    if (!customer) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Customer updated By Id successfuly!`,
      data: customer,
    });
  }

  @ApiOperation({ summary: "Mijozni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Customer By Id",
    type: Customer,
  })
  @Delete(":id")
  async deleteCustomerById(@Res() res: Response, @Param("id") id: string) {
    const customer = await this.customerService.deleteCustomerById(+id);
    if (!customer) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Customer deleted By Id successfuly!`,
      data: customer,
    });
  }
}
