import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HumanCategory } from "./models/human_category.model";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";

@Injectable() // boshqa fayllarga suqib kiritish uchun ishlatiladi
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory) private humanCategoryModel: typeof HumanCategory
  ) {}

  async createHumanCategory(
    createHumanCategoryDto: CreateHumanCategoryDto
  ): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.create(
      createHumanCategoryDto
    );
    return human_category;
  }

  async getAllHumanCategorys(): Promise<HumanCategory[]> {
    const human_categorys = await this.humanCategoryModel.findAll({
      include: { all: true },
    });
    return human_categorys;
  }

  async getHumancategoryByName(name: string): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.findOne({
      where: { name },
      include: { all: true },
    });
    return human_category;
  }

  async getHumancategoryById(id: number): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.findOne({
      where: { id },
      include: { all: true },
    });
    return human_category;
  }

  async updateHumanCategoryById(
    id: number,
    updateHumanCategoryDto: UpdateHumanCategoryDto
  ): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.update(
      updateHumanCategoryDto,
      { where: { id }, returning: true }
    );
    return human_category[1][0];
  }

  async deletehumanCategoryById(id: number): Promise<number> {
    const human_category = await this.humanCategoryModel.destroy({
      where: { id },
    });
    return human_category;
  }
}
