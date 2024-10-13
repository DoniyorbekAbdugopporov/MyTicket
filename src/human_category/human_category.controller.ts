import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { HumanCategoryService } from "./human_category.service";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HumanCategory } from "./models/human_category.model";

@ApiTags("HumanCategory")
@Controller("human-category")
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  @ApiOperation({ summary: "Human Category yaratish" })
  @ApiResponse({
    status: 201,
    description: "Human Category yaratish",
    type: HumanCategory,
  })
  @Post("create")
  async createHumanCategory(
    @Res() res: Response,
    @Body() createHumanCategoryDto: CreateHumanCategoryDto
  ) {
    const human_category = await this.humanCategoryService.createHumanCategory(
      createHumanCategoryDto
    );
    return res.status(HttpStatus.OK).send({
      message: `New Human Category created successfully!`,
      data: human_category,
    });
  }

  @ApiOperation({ summary: "Barcha Human Categorylarni olish" })
  @ApiResponse({
    status: 200,
    description: "List of Human Category",
    type: [HumanCategory],
  })
  @Get("all")
  async getAllHumanCategory(@Res() res: Response) {
    const data = await this.humanCategoryService.getAllHumanCategorys();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Human Category founded succefully`,
      data: data,
    });
  }

  @ApiOperation({ summary: "Human Categoryni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Human Category By Id",
    type: HumanCategory,
  })
  @Get("search")
  async getHumanCategoryByName(
    @Res() res: Response,
    @Query("name") name: string
  ) {
    const human_category =
      await this.humanCategoryService.getHumancategoryByName(name);
    if (!human_category) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Human Category founded By Name successfuly!`,
      data: human_category,
    });
  }

  @ApiOperation({ summary: "Human Categoryni ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Get Human Category By Id",
    type: HumanCategory,
  })
  @Get(":id")
  async getHumanCategoryById(@Res() res: Response, @Param("id") id: number) {
    const human_category =
      await this.humanCategoryService.getHumancategoryById(id);
    if (!human_category) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Human Category founded By Id successfuly!`,
      data: human_category,
    });
  }

  @ApiOperation({ summary: "Human Categoryni ID bo'yicha tahrirlash" })
  @ApiResponse({
    status: 200,
    description: "Update Human Category By Id",
    type: HumanCategory,
  })
  @Patch(":id")
  async updateHumanCategoryById(
    @Res() res: Response,
    @Param("id") id: number,
    @Body() updateHumanCategoryDto: UpdateHumanCategoryDto
  ) {
    const human_category =
      await this.humanCategoryService.updateHumanCategoryById(
        id,
        updateHumanCategoryDto
      );
    if (!human_category) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Human Category updated By Id successfuly!`,
      data: human_category,
    });
  }

  @ApiOperation({ summary: "Human Categoryni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Human Category By Id",
    type: HumanCategory,
  })
  @Delete(":id")
  async deleteHumanCategoryById(@Res() res: Response, @Param("id") id: number) {
    const human_category =
      await this.humanCategoryService.deletehumanCategoryById(id);
    if (!human_category) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Human Category deleted By Id successfuly!`,
      data: human_category,
    });
  }
}