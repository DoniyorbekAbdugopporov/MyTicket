import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./models/users.model";
import { RolesService } from "../roles/roles.service";
import { Roles } from "../roles/models/roles.model";
import { AddRemoveRoleDto } from "./dto/add-remove-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private usersModel: typeof Users,
    // @InjectModel(Users) private rolesModel: typeof Roles,
    private readonly rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersModel.create(createUserDto);
    // const role = await this.rolesModel.findOne({
    //   where: {value: createUserDto.role_value.toUpperCase()}
    // })
    const role = await this.rolesService.findRoleByValue(
      createUserDto.role_value
    );

    if (!role) {
      throw new BadRequestException("Role not found!");
    }
    // await newUser.$set("roles", [role.id]);
    // await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  findUserByEmail(email: string) {
    return this.usersModel.findOne({
      where: { email },
      include: {
        all: true,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
  }

  findAll() {
    return this.usersModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.usersModel.findOne({ where: { id }, include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.usersModel.destroy({ where: { id } });
  }

  async addRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.usersModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.rolesService.findRoleByValue(
      addRemoveRoleDto.role_value
    );

    if (user && role) {
      await user.$add("roles", role.id);
      const updatedUser = await this.usersModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } }
      );
      return updatedUser;
    }

    throw new NotFoundException("Foydalanuvchi yoki Role topilmadi");
  }

  async removeRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.usersModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.rolesService.findRoleByValue(
      addRemoveRoleDto.role_value
    );

    if (user && role) {
      await user.$remove("roles", role.id);
      const updatedUser = await this.usersModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } }
      );
      return updatedUser;
    }

    throw new NotFoundException("Foydalanuvchi yoki Role topilmadi");
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.usersModel.findByPk(activateUserDto.userId);

    if (user) {
      user.is_active = true;
      await user.save();
      return user;
    }

    throw new NotFoundException("Foydalanuvchi topilmadi");
  }

  async deactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.usersModel.findByPk(activateUserDto.userId);
    if (user) {
      user.is_active = false;
      await user.save();
      return user;
    }
    throw new NotFoundException("Foydalanuvchi topilmadi");
  }
}
