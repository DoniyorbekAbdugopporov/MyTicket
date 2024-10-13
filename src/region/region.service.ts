import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionModel: typeof Region) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionModel.create(createRegionDto);
    return region;
  }

  async getAllRegions(): Promise<Region[]> {
    const regions = await this.regionModel.findAll({ include: { all: true } });
    return regions;
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionModel.findOne({
      where: { id },
      include: { all: true },
    });
    return region;
  }

  async updateRegionById(
    id: number,
    updateRegionDto: UpdateRegionDto
  ): Promise<Region> {
    const region = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return region[1][0];
  }

  async deleteRegionById(id: number): Promise<number> {
    const region = await this.regionModel.destroy({ where: { id } });
    return region;
  }
}
