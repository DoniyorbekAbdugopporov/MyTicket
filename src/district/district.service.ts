import { Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtModel: typeof District) {}

  async createDistrict(
    createDistrictDto: CreateDistrictDto
  ): Promise<District> {
    const district = await this.districtModel.create(createDistrictDto);
    return district;
  }

  async getAllDistricts(): Promise<District[]> {
    const districts = await this.districtModel.findAll({
      include: { all: true },
    });
    return districts;
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtModel.findOne({
      where: { id },
      include: { all: true },
    });
    return district;
  }

  async updateDistrictById(
    id: number,
    updateDistrictDto: UpdateDistrictDto
  ): Promise<District> {
    const district = await this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return district[1][0];
  }

  async deleteDistrictById(id: number): Promise<number> {
    const district = await this.districtModel.destroy({ where: { id } });
    return district;
  }
}
