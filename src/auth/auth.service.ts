import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/models/users.model";
import { SignInDto } from "./dto/signin.dto";
import { CustomerService } from "../customer/customer.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { Customer } from "../customer/models/customer.model";
import { AdminService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInAdminDto } from "./dto/signinadmin.dto";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService // amaliyot uchun customerga ham signIn va signUp yozdim
  ) {}

  // User sign-up
  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.generateToken(newUser);
  }

  // User sign-in
  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi.");
    }
    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi.");
    }
    return await this.generateToken(user);
  }

  async generateToken(user: Users) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  // Admin sign-up
  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.adminService.findAdminByLogin(
      createAdminDto.login
    );

    if (existingAdmin) {
      throw new BadRequestException("Bunday Admin mavjud!");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = await this.adminService.createAdmin({
      ...createAdminDto,
      password: hashedPassword,
    });
    return this.generateTokenAdmin(newAdmin);
  }

  // Admin sign-in
  async signInAdmin(signInAdminDto: SignInAdminDto) {
    const admin = await this.adminService.findAdminByLogin(
      signInAdminDto.login
    );

    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi!");
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Admin topilmadi!");
    }

    // const refreshToken = this.jwtService.sign(
    //   { sub: admin.id, login: admin.login },
    //   { expiresIn: "7d" }
    // );

    // await this.storeRefreshToken(admin.id, refreshToken);

    // return {
    //   access_token: this.jwtService.sign(
    //     { sub: admin.id, login: admin.login },
    //     { expiresIn: "1h" }
    //   ),
    //   refresh_token: refreshToken,
    // };

    return this.generateTokenAdmin(admin);
  }

  async generateTokenAdmin(admin: Admin) {
    const payload = {
      sub: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "1h" }),
    };
  }

  // Customer sign-up
  async signUpCustomer(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.customerService.findCustomerByEmail(
      createCustomerDto.email
    );

    if (existingCustomer) {
      throw new BadRequestException("Bunday mijoz mavjud!");
    }

    const hashedPassword = await bcrypt.hash(
      createCustomerDto.hashed_password,
      10
    );
    const newCustomer = await this.customerService.createCustomer({
      ...createCustomerDto,
      hashed_password: hashedPassword,
    });

    return this.generateTokenCustomer(newCustomer);
  }

  // Hash and store the refresh token
  async storeRefreshToken(customerId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.customerService.updateRefreshToken(
      customerId,
      hashedRefreshToken
    );
  }

  // Customer sign-in
  async signInCustomer(signInDto: SignInDto) {
    const customer = await this.customerService.findCustomerByEmail(
      signInDto.email
    );
    if (!customer) {
      throw new UnauthorizedException("Mijoz topilmadi.");
    }

    const validPassword = await bcrypt.compare(
      signInDto.password,
      customer.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Mijoz topilmadi.");
    }

    const refreshToken = this.jwtService.sign(
      { sub: customer.id, email: customer.email }, // Added email to refresh token payload
      { expiresIn: "7d" }
    );

    await this.storeRefreshToken(customer.id, refreshToken);

    return {
      access_token: this.jwtService.sign(
        { sub: customer.id, email: customer.email },
        { expiresIn: "1h" } // Added expiration for access token
      ),
      refresh_token: refreshToken,
    };
  }

  async generateTokenCustomer(customer: Customer) {
    const payload = {
      sub: customer.id,
      email: customer.email,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "1h" }),
    };
  }
}
