import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Country } from './models/country.model';

@ApiTags("Country")
@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: "Davlat nomini kiritish" })
  @ApiResponse({
    status: 201,
    description: "New Country name",
    type: Country,
  })
  @Post("create")
  async createCountry(
    @Res() res: Response,
    @Body() createCountryDto: CreateCountryDto
  ) {
    const country = await this.countryService.createCountry(createCountryDto);
    return res.status(HttpStatus.OK).send({
      message: `New Country created successfully!`,
      data: country,
    });
  }

  @ApiOperation({ summary: "Barcha davlatlar ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Country",
    type: [Country],
  })
  @Get("all")
  async getAllCountrys(@Res() res: Response) {
    const countries = await this.countryService.getAllCountrys();
    if (!countries) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Countries founded succefully`,
      data: countries,
    });
  }

  @ApiOperation({ summary: "Davlatni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Country By Id",
    type: Country,
  })
  @Get(":id")
  async getCountryById(@Res() res: Response, @Param("id") id: string) {
    const country = await this.countryService.getCountryById(+id);
    if (!country) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Country founded By Id successfuly!`,
      data: country,
    });
  }

  @ApiOperation({ summary: "Davlatni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Country By Id",
    type: Country,
  })
  @Patch(":id")
  async updateCountryById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCountryDto: UpdateCountryDto
  ) {
    const country = await this.countryService.updateCountryById(
      +id,
      updateCountryDto
    );
    if (!country) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Country updated By Id successfuly!`,
      data: country,
    });
  }

  @ApiOperation({ summary: "Davlatni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Country By Id",
    type: Country,
  })
  @Delete(":id")
  async deleteCountryById(@Res() res: Response, @Param("id") id: string) {
    const country = await this.countryService.deleteCountryById(+id);
    if (!country) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Country deleted By Id successfuly!`,
      data: country,
    });
  }
}
