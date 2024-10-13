import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from './models/district.model';

@ApiTags("District")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "UpdateDistrict"})
  @ApiResponse({
    status: 201,
    description: "Create District",
    type: District,
  })
  @Post("create")
  async createDistrict(
    @Res() res: Response,
    @Body() createDistrictDto: CreateDistrictDto
  ) {
    const district =
      await this.districtService.createDistrict(createDistrictDto);
    return res.status(HttpStatus.OK).send({
      message: `New District created successfully!`,
      data: district,
    });
  }

  @ApiOperation({ summary: "Get all Districts"})
  @ApiResponse({
    status: 200,
    description: "List of District",
    type: [District],
  })
  @Get("all")
  async getAllDistricts(@Res() res: Response) {
    const data = await this.districtService.getAllDistricts();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All District founded succefully`,
      data: data,
    });
  }

  @ApiOperation({ summary: "Get District by ID"})
  @ApiResponse({
    status: 200,
    description: "Get District By Id",
    type: District,
  })
  @Get(":id")
  async getDistrictById(@Res() res: Response, @Param("id") id: string) {
    const district = await this.districtService.getDistrictById(+id);
    if (!district) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `District founded By Id successfuly!`,
      data: district,
    });
  }

  @ApiOperation({ summary: "Update District by ID"})
  @ApiResponse({
    status: 200,
    description: "Update District By Id",
    type: District,
  })
  @Patch(":id")
  async updateDistrictById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    const district = await this.districtService.updateDistrictById(
      +id,
      updateDistrictDto
    );
    if (!district) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `District updated By Id successfuly!`,
      data: district,
    });
  }

  @ApiOperation({ summary: "Delete District by ID"})
  @ApiResponse({
    status: 200,
    description: "Delete District By Id",
    type: District,
  })
  @Delete(":id")
  async deleteDistrictById(@Res() res: Response, @Param("id") id: string) {
    const district = await this.districtService.deleteDistrictById(+id);
    if (!district) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `District deleted By Id successfuly!`,
      data: district,
    });
  }
}
