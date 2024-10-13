import { Injectable } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Venue } from "./models/venue.model";

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue) private venueModel: typeof Venue) {}

  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    const venue = await this.venueModel.create(createVenueDto);
    return venue;
  }

  async getAllVenues(): Promise<Venue[]> {
    const venues = await this.venueModel.findAll({ include: { all: true } }); // venue_photo jadvalini qo'shib chiqaradi
    return venues;
  }

  async getVenueById(id: number): Promise<Venue> {
    const venue = await this.venueModel.findOne({
      where: { id },
      include: { all: true },
    });
    return venue;
  }

  async updateVenueById(
    id: number,
    updateVenueDto: UpdateVenueDto
  ): Promise<Venue> {
    const new_venue = await this.venueModel.update(updateVenueDto, {
      where: { id },
      returning: true,
    });
    return new_venue[1][0];
  }

  async deleteVenueById(id: number): Promise<number> {
    const venue = await this.venueModel.destroy({ where: { id } });
    return venue;
  }
}
