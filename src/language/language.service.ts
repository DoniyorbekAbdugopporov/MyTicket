import { Injectable } from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { Language } from "./models/language.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private languageModel: typeof Language) {}

  async createLanguage(
    createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    const language = await this.languageModel.create(createLanguageDto);
    return language;
  }

  async getAllLanguages(): Promise<Language[]> {
    const languages = await this.languageModel.findAll({
      include: { all: true },
    });
    return languages;
  }

  async getLanguageById(id: number): Promise<Language> {
    const language = await this.languageModel.findOne({
      where: { id },
      include: { all: true },
    });
    return language;
  }

  async updateLanguageById(
    id: number,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    const language = this.languageModel.update(updateLanguageDto, {
      where: { id },
      returning: true,
    });
    return language[1][0];
  }

  async deleteLanguageById(id: number): Promise<number> {
    const language = await this.languageModel.destroy({ where: { id } });
    return language;
  }
}
