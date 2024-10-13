import { Injectable } from "@nestjs/common";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Country } from "./models/country.model";
import { count } from "console";

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryModel: typeof Country) {}

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const new_country = await this.countryModel.create(createCountryDto);
    return new_country;
  }

  async getAllCountrys(): Promise<Country[]> {
    const countrys = await this.countryModel.findAll({
      include: { all: true },
    });
    return countrys;
  }

  async getCountryById(id: number): Promise<Country> {
    const country = await this.countryModel.findOne({
      where: { id },
      include: { all: true },
    });
    return country;
  }

  async updateCountryById(
    id: number,
    updateCountryDto: UpdateCountryDto
  ): Promise<Country> {
    const country = await this.countryModel.update(updateCountryDto, {
      where: { id },
      returning: true,
    });
    return country[1][0];
  }

  async deleteCountryById(id: number): Promise<number> {
    return this.countryModel.destroy({ where: { id } });
  }
}
