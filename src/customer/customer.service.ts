import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerModel: typeof Customer) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    const newCustomer = await this.customerModel.create(createCustomerDto);
    return newCustomer;
  }

  async getAllCustomers(): Promise<Customer[]> {
    const customers = await this.customerModel.findAll({
      include: { all: true },
    });
    return customers;
  }

  async findCustomerByEmail(email: string): Promise<Customer | null> {
    return this.customerModel.findOne({ where: { email } });
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    const customer = await this.customerModel.findOne({
      where: { id },
      include: { all: true },
    });
    return customer;
  }

  async updateRefreshToken(customerId: number, hashedRefreshToken: string) {
    return this.customerModel.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: customerId } }
    );
  }

  async updateCustomerById(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    const [affectedRows, updatedCustomers] = await this.customerModel.update(
      updateCustomerDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedRows === 0) {
      throw new UnauthorizedException("Customer not found or update failed.");
    }

    return updatedCustomers[0];
  }

  async deleteCustomerById(id: number): Promise<number> {
    return this.customerModel.destroy({ where: { id } });
  }

  // Refresh token validation
  async validateRefreshToken(customerId: number, refreshToken: string) {
    const customer = await this.customerModel.findOne({
      where: { id: customerId },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new UnauthorizedException("Invalid refresh token.");
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      customer.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Invalid refresh token.");
    }

    return customer;
  }
}
