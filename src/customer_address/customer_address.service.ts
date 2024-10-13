import { Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerAddress } from "./models/customer_address.model";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress)
    private customerAddressModel: typeof CustomerAddress
  ) {}

  async createCustomerAddress(
    createCustomerAddressDto: CreateCustomerAddressDto
  ): Promise<CustomerAddress> {
    const new_customer_address = await this.customerAddressModel.create(
      createCustomerAddressDto
    );
    return new_customer_address;
  }

  async getAllCustomerAddresses(): Promise<CustomerAddress[]> {
    const data = await this.customerAddressModel.findAll({
      include: { all: true },
    });
    return data;
  }

  async getCustomerAddressById(id: number): Promise<CustomerAddress> {
    const customer_address = await this.customerAddressModel.findOne({
      where: { id },
      include: { all: true },
    });
    return customer_address;
  }

  async updateCustomerAddressById(
    id: number,
    updateCustomerAddressDto: UpdateCustomerAddressDto
  ): Promise<CustomerAddress> {
    const customer_address = await this.customerAddressModel.update(
      updateCustomerAddressDto,
      { where: { id }, returning: true }
    );
    return customer_address[1][0];
  }

  async deleteCustomerAddressById(id: number): Promise<number> {
    return this.customerAddressModel.destroy({ where: { id } });
  }
}
