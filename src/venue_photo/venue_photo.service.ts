import { Injectable } from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { InjectModel } from "@nestjs/sequelize";
import { VenuePhoto } from "./models/venue_photo.model";
import { FileService } from "../file/file.service";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto) private venuePhotoModel: typeof VenuePhoto,
    private readonly fileService: FileService
  ) {}

  async createVenuePhoto(
    createVenuePhotoDto: CreateVenuePhotoDto,
    image: any
  ): Promise<VenuePhoto> {
    const fileName = await this.fileService.saveFile(image)
    const venue_photo = await this.venuePhotoModel.create({...createVenuePhotoDto, url: fileName});
    return venue_photo;
  }

  async getAllVenuePhotos(): Promise<VenuePhoto[]> {
    const venue_photos = await this.venuePhotoModel.findAll({
      include: { all: true },
    });
    return venue_photos;
  }

  async getVenuePhotoById(id: number): Promise<VenuePhoto> {
    const venue_photo = await this.venuePhotoModel.findOne({
      where: { id },
      include: { all: true },
    });
    return venue_photo;
  }

  async updateVenuePhotoById(
    id: number,
    updateVenuePhotoDto: UpdateVenuePhotoDto
  ): Promise<VenuePhoto> {
    const venue_photo = await this.venuePhotoModel.update(updateVenuePhotoDto, {
      where: { id },
      returning: true,
    });
    return venue_photo[1][0];
  }

  async deleteVenuePhotoById(id: number): Promise<number> {
    const venue_photo = await this.venuePhotoModel.destroy({ where: { id } });
    return venue_photo;
  }
}
