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
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response } from "express";
import { ActivateAdminDto } from "./dto/activate-admin.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreatorGuard } from "../guards/creator.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Super admin yaratish" })
  @ApiResponse({
    status: 201,
    description: "SuperAdmin",
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @Post("create")
  async createAdmin(
    // @Res() res: Response,
    @Body() createAdminDto: CreateAdminDto
  ) {
    const newAdmin = await this.adminService.createAdmin(createAdminDto);
    return newAdmin;
    // return res.status(HttpStatus.CREATED).send({
    //   message: `New admin created successfully!`,
    //   data: newAdmin,
    // });
  }

  @ApiOperation({ summary: "Barcha Adminlar ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Admins",
    type: [Admin],
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAllAdmins(@Res() res: Response) {
    const admins = await this.adminService.getAllAdmins();
    if (!admins || admins.length === 0) {
      throw new NotFoundException("No admins found.");
    }
    return res.status(HttpStatus.OK).send({
      message: `All admins retrieved successfully!`,
      data: admins,
    });
  }

  @ApiOperation({ summary: "Adminlarni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Admin By Id",
    type: Admin,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getAdminById(@Res() res: Response, @Param("id") id: string) {
    const admin = await this.adminService.getAdminById(+id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return res.status(HttpStatus.OK).send({
      message: `Admin retrieved successfully!`,
      data: admin,
    });
  }

  @ApiOperation({ summary: "Adminlarni login bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Admin By Login",
    type: Admin,
  })
  @UseGuards(JwtAuthGuard)
  @Get("login:login")
  async getAdminByLogin(@Res() res: Response, @Param("login") login: string) {
    const admin = await this.adminService.findAdminByLogin(login);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${login} not found.`);
    }
    return res.status(HttpStatus.OK).send({
      message: `Admin retrieved successfully!`,
      data: admin,
    });
  }

  @ApiOperation({ summary: "Adminlarni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Admin By Id",
    type: Admin,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateAdminById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    const admin = await this.adminService.updateAdminById(+id, updateAdminDto);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return res.status(HttpStatus.OK).send({
      message: `Admin updated successfully!`,
      data: admin,
    });
  }

  @ApiOperation({ summary: "Adminlarni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Admin By Id",
    type: Admin,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteAdminById(@Res() res: Response, @Param("id") id: string) {
    const deleted = await this.adminService.deleteAdminById(+id);
    if (deleted === 0) {
      throw new NotFoundException("Admin not found or already deleted.");
    }
    return res.status(HttpStatus.OK).send({
      message: `Admin deleted successfully!`,
    });
  }

  @ApiOperation({ summary: "Adminni activlashtirish" })
  @ApiResponse({
    status: 200,
    description: "Admin activated role",
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Post("activate")
  async activateUser(@Body() activateAdminrDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminrDto);
  }
}
