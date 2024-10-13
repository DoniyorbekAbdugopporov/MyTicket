import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { VenueTypeService } from "./venue_type.service";
import { Response } from "express";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Venue Type")
@Controller("venue-type")
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @Post("create")
  async createVenueType(
    @Res() res: Response,
    @Body() createVenueTypeDto: CreateVenueTypeDto
  ) {
    const new_venue_type =
      await this.venueTypeService.createVenueType(createVenueTypeDto);
    return res.status(HttpStatus.CREATED).send({
      message: `New Venue Type Creatted Successfully!`,
      data: new_venue_type,
    });
  }

  @Get("all")
  async getAllVenueTypes(@Res() res: Response) {
    const all_venue_type = await this.venueTypeService.getAllVenueType();
    return res.status(HttpStatus.OK).send({
      message: `All Venue types founded successfully!`,
      data: all_venue_type,
    });
  }

  @Get("search")
  async getVenueTypeByName(@Res() res: Response, @Query("name") name: string) {
    const venue_type = await this.venueTypeService.getVenueTypeByName(name);
    return res.status(HttpStatus.FOUND).send({
      message: `Venue type Founded By name Successfully!`,
      data: venue_type,
    });
  }

  @Get(":id")
  async getVenueTypeById(@Res() res: Response, @Param("id") id: number) {
    const venue_type = await this.venueTypeService.getVenueTypeById(id);
    return res.status(HttpStatus.FOUND).send({
      message: `Venue type Founded By Id Successfully!`,
      data: venue_type,
    });
  }

  @Patch(":id")
  async updateVenueTypeById(
    @Res() res: Response,
    @Param("id") id: number,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto
  ) {
    const venue_type = await this.venueTypeService.updateVenueTypeById(
      id,
      updateVenueTypeDto
    );
    return res.status(HttpStatus.OK).send({
      message: `Venue Type Updated By Id Succeessfully!`,
      data: venue_type,
    });
  }

  @Delete(":id")
  async deleteVenueTypeById(@Res() res: Response, @Param("id") id: number) {
    const venue_type = await this.venueTypeService.deleteVenuetypeById(id);
    return res.status(HttpStatus.OK).send({
      messsage: `Venue Type deleted By Id Successfully!`,
      data: venue_type,
    });
  }
}
