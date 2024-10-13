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
import { CustomerAddressService } from "./customer_address.service";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerAddress } from "./models/customer_address.model";

@ApiTags("Customer Address")
@Controller("customer-address")
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService
  ) {}

  @ApiOperation({ summary: "Yangi mijoz adresini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "New Customer Address",
    type: CustomerAddress,
  })
  @Post("create")
  async createCustomerAddress(
    @Res() res: Response,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto
  ) {
    const customer_address =
      await this.customerAddressService.createCustomerAddress(
        createCustomerAddressDto
      );
    return res.status(HttpStatus.OK).send({
      message: `New Customer Address created successfully!`,
      data: customer_address,
    });
  }

  @ApiOperation({ summary: "Barcha mijozlarning adresslarini ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Customer Address",
    type: [CustomerAddress],
  })
  @Get("all")
  async getAllCustomerAddresses(@Res() res: Response) {
    const data = await this.customerAddressService.getAllCustomerAddresses();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Customer Addresses founded succefully`,
      data: data,
    });
  }

  @ApiOperation({ summary: "Mijoz addressini ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Customer Address By Id",
    type: CustomerAddress,
  })
  @Get(":id")
  async getCustomerAddressById(@Res() res: Response, @Param("id") id: string) {
    const customer_address =
      await this.customerAddressService.getCustomerAddressById(+id);
    if (!customer_address) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Customer Address founded By Id successfuly!`,
      data: customer_address,
    });
  }

  @ApiOperation({ summary: "Mijoz Adresini ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Customer Address By Id",
    type: CustomerAddress,
  })
  @Patch(":id")
  async updateCustomerAddressById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto
  ) {
    const customer_address =
      await this.customerAddressService.updateCustomerAddressById(
        +id,
        updateCustomerAddressDto
      );
    if (!customer_address) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Customer Address updated By Id successfuly!`,
      data: customer_address,
    });
  }

  @ApiOperation({ summary: "Mijoz Adresini ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Customer Address By Id",
    type: CustomerAddress,
  })
  @Delete(":id")
  async deleteCustomerAddressById(
    @Res() res: Response,
    @Param("id") id: string
  ) {
    const customer_address =
      await this.customerAddressService.deleteCustomerAddressById(+id);
    if (!customer_address) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Customer Address deleted By Id successfuly!`,
      data: customer_address,
    });
  }
}
