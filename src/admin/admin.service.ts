import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { ActivateAdminDto } from "./dto/activate-admin.dto";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = await this.adminModel.create(createAdminDto);
    return newAdmin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    const admins = await this.adminModel.findAll({ include: { all: true } });
    return admins;
  }

  async findAdminByLogin(login: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ where: { login } });
    // console.log(admin);
    return admin;
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    return admin;
  }

  async updateAdminById(
    id: number,
    updateAdminDto: UpdateAdminDto
  ): Promise<Admin> {
    const [numberOfAffectedRows, updatedAdmins] = await this.adminModel.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error("Admin not found or no changes applied");
    }

    return updatedAdmins[0];
  }

  async deleteAdminById(id: number): Promise<number> {
    const deletedRowsCount = await this.adminModel.destroy({ where: { id } });
    if (deletedRowsCount === 0) {
      throw new Error("Admin not found or already deleted");
    }
    return deletedRowsCount;
  }

  // activate admin is_active: true qilish
  async activateAdmin(activateAdminDto: ActivateAdminDto) {
    const admin = await this.adminModel.findByPk(activateAdminDto.adminId);

    if (admin) {
      admin.is_active = true;
      await admin.save();
      return admin;
    }

    throw new NotFoundException("Admin topilmadi");
  }

  // deactivate admin is_active: false qilish
  async deActivateAdmin(activateAdminDto: ActivateAdminDto) {
    const admin = await this.adminModel.findByPk(activateAdminDto.adminId);

    if (admin) {
      admin.is_active = false;
      await admin.save();
      return admin;
    }

    throw new NotFoundException("Admin topilmadi");
  }
}
