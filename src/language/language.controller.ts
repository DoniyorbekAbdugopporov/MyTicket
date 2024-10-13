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
} from "@nestjs/common";
import { LanguageService } from "./language.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Language } from "./models/language.model";

@ApiTags("Language")
@Controller("language")
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: "Language yaratish" })
  @ApiResponse({
    status: 201,
    description: "Uzbek tili",
    type: Language,
  })
  @Post("create")
  async createLanguage(
    @Res() res: Response,
    @Body() createLanguageDto: CreateLanguageDto
  ) {
    const language =
      await this.languageService.createLanguage(createLanguageDto);
    return res.status(HttpStatus.OK).send({
      message: `New Language created successfully!`,
      data: language,
    });
  }

  @ApiOperation({ summary: "Barcha uzbek tillarini olish" })
  @ApiResponse({
    status: 200,
    description: "All Languages",
    type: [Language],
  })
  @Get("all")
  async getLanguages(@Res() res: Response) {
    const languages = await this.languageService.getAllLanguages();
    if (!languages) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Languages founded succefully`,
      data: languages,
    });
  }

  @ApiOperation({ summary: "Uzbek tili ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Language By Id",
    type: Language,
  })
  @Get(":id")
  async getLanguageById(@Res() res: Response, @Param("id") id: string) {
    const language = await this.languageService.getLanguageById(+id);
    if (!language) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Language founded By Id successfuly!`,
      data: language,
    });
  }

  @ApiOperation({ summary: "Uzbek tili ID bo'yicha o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update Language By Id",
    type: Language,
  })
  @Patch(":id")
  async updateLanguageById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    const language = await this.languageService.updateLanguageById(
      +id,
      updateLanguageDto
    );
    if (!language) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Language updated By Id successfuly!`,
      data: language,
    });
  }

  @ApiOperation({ summary: "Uzbek tili ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Language By Id",
    type: Language,
  })
  @Delete(":id")
  async deleteLanguageById(@Res() res: Response, @Param("id") id: string) {
    const language = await this.languageService.deleteLanguageById(+id);
    if (!language) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Language deleted By Id successfuly!`,
      data: language,
    });
  }
}
