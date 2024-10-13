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
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Region")
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post("create")
  async createRegion(
    @Res() res: Response,
    @Body() createRegionDto: CreateRegionDto
  ) {
    const region = await this.regionService.createRegion(createRegionDto);
    return res.status(HttpStatus.OK).send({
      message: `New Human Category created successfully!`,
      data: region,
    });
  }

  @Get("all")
  async getAllRegions(@Res() res: Response) {
    const regions = await this.regionService.getAllRegions();
    if (!regions) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Regions founded succefully`,
      data: regions,
    });
  }

  @Get(":id")
  async getRegionById(@Res() res: Response, @Param("id") id: string) {
    const region = await this.regionService.getRegionById(+id);
    if (!region) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Region founded By Id successfuly!`,
      data: region,
    });
  }

  @Patch(":id")
  async updateRegionById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateRegionDto: UpdateRegionDto
  ) {
    const region = await this.regionService.updateRegionById(
      +id,
      updateRegionDto
    );
    if (!region) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Region updated By Id successfuly!`,
      data: region,
    });
  }

  @Delete(":id")
  async deleteRegionById(@Res() res: Response, @Param("id") id: string) {
    const region = await this.regionService.deleteRegionById(+id);
    if (!region) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Region deleted By Id successfuly!`,
      data: region,
    });
  }
}
