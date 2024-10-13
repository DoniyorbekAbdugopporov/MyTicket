import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/signin.dto";
import { SignInAdminDto } from "./dto/signinadmin.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreatorGuard } from "../guards/creator.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchini ro'yhatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tatayotgan foydalanuvchi",
    type: String,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Ro'yhatdan o'tgan foydalanuvchi",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: "Yangi adminni ro'yhatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tayotgan admin",
    type: String,
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("signupadmin")
  async signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tagan admin",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signinadmin")
  async signInAdmin(@Body() signInAdminDto: SignInAdminDto) {
    return this.authService.signInAdmin(signInAdminDto);
  }

  @ApiOperation({ summary: "Yangi customerni ro'yhatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tayotgan customer",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signupcustomer")
  async signUpCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.signUpCustomer(createCustomerDto);
  }

  @ApiOperation({ summary: "Customer tizimga kirish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tagan Customer",
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signincustomer")
  async signInCustomer(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
