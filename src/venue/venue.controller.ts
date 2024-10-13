import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Obyektlar(Tadbir o'tkaziladigan joylar)")
@Controller("venue")
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post("create")
  async createVenue(
    @Res() res: Response,
    @Body() createVenueDto: CreateVenueDto
  ) {
    const venue = await this.venueService.createVenue(createVenueDto);
    return res.status(HttpStatus.OK).send({
      message: `New Venue created successfully!`,
      data: venue,
    });
  }

  @Get("all")
  async getAllVenues(@Res() res: Response) {
    const venue = await this.venueService.getAllVenues();
    if (!venue) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Venues founded succefully`,
      data: venue,
    });
  }

  @Get(":id")
  async getVenueById(@Res() res: Response, @Param("id") id: string) {
    const venue = await this.venueService.getVenueById(+id);
    if (!venue) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Venue founded By Id successfuly!`,
      data: venue,
    });
  }

  @Patch(":id")
  async updateVenueById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateVenueDto: UpdateVenueDto
  ) {
    const venue = await this.venueService.updateVenueById(+id, updateVenueDto);
    if (!venue) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Venue updated By Id successfuly!`,
      data: venue,
    });
  }

  @Delete(":id")
  async deleteVenueById(@Res() res: Response, @Param("id") id: string) {
    const venue = await this.venueService.deleteVenueById(+id);
    if (!venue) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Venue deleted By Id successfuly!`,
      data: venue,
    });
  }
}
