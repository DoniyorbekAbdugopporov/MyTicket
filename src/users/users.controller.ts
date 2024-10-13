import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRemoveRoleDto } from "./dto/add-remove-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { SelfGuard } from "../guards/self.guard";
import { Roles } from "../decorators/roles-auth.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "./models/users.model";

@ApiTags("Foydalanuvchilar")
@Roles("ADMIN", "SUPERADMIN")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Foydalanuvchi yaratish" })
  @ApiResponse({
    status: 201,
    description: "New User",
    type: Users,
  })
  // @UseGuards(JwtAuthGuard) // barchasiga amal qiladi
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Users",
    type: [Users],
  })
  @UseGuards(JwtAuthGuard) // guart qo'yildi
  @Get("all")
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get User By Id",
    type: Users,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni Email bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get User By Email",
    type: Users,
  })
  @UseGuards(JwtAuthGuard)
  @Get("email/:email")
  findUserByEmail(@Param("email") email: string): Promise<Users> {
    return this.usersService.findUserByEmail(email);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update User By Id",
    type: Users,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete User By Id",
    type: Users,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: "Foydalanuvchilarga rol qo'shish" })
  @ApiResponse({
    status: 200,
    description: "User added role",
    type: Users,
  })
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post("add-role")
  async addRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.addRole(addRemoveRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni rolini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User deleted role",
    type: Users,
  })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post("remove-role")
  async removeRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.removeRole(addRemoveRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini activlashtirish" })
  @ApiResponse({
    status: 200,
    description: "User activated role",
    type: Users,
  })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post("activate")
  async activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
}
