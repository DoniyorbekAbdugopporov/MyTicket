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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { VenuePhotoService } from "./venue_photo.service";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Obyeklarning rasmlari")
@Controller("venue-photo")
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  async createVenuePhoto(
    @Res() res: Response,
    @Body() createVenuePhotoDto: CreateVenuePhotoDto,
    @UploadedFile() image: any
  ) {
    const venue_photo = await this.venuePhotoService.createVenuePhoto(
      createVenuePhotoDto,
      image
    );
    
    console.log(image);

    return res.status(HttpStatus.OK).send({
      message: `New Venue Photo created successfully!`,
      data: venue_photo,
    });
  }

  @Get("all")
  async getAllVenuePhotos(@Res() res: Response) {
    const data = await this.venuePhotoService.getAllVenuePhotos();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Venue Photos founded succefully`,
      data: data,
    });
  }

  @Get(":id")
  async getVenuePhotoById(@Res() res: Response, @Param("id") id: string) {
    const venue_photo = await this.venuePhotoService.getVenuePhotoById(+id);
    if (!venue_photo) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Venue Photo founded By Id successfuly!`,
      data: venue_photo,
    });
  }

  @Patch(":id")
  async updateVenuePhotoById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto
  ) {
    const venue_photo = await this.venuePhotoService.updateVenuePhotoById(
      +id,
      updateVenuePhotoDto
    );
    if (!venue_photo) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Venue Photo updated By Id successfuly!`,
      data: venue_photo,
    });
  }

  @Delete(":id")
  async deleteVenuePhotoById(@Res() res: Response, @Param("id") id: string) {
    const venue_photo = await this.venuePhotoService.deleteVenuePhotoById(+id);
    if (!venue_photo) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Venue Photo deleted By Id successfuly!`,
      data: venue_photo,
    });
  }
}
