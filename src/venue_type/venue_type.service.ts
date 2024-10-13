import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { VenueType } from "./models/venue_type.model";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType) private venueTypeModel: typeof VenueType
  ) {}

  async createVenueType(
    createVenueTypeDto: CreateVenueTypeDto
  ): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.create(createVenueTypeDto);
    return venue_type;
  }

  async getAllVenueType(): Promise<VenueType[]> {
    const all_venue_types = await this.venueTypeModel.findAll({
      include: { all: true },
    });
    return all_venue_types;
  }

  async getVenueTypeByName(name: string): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.findOne({
      where: { name },
      include: { all: true },
    });
    return venue_type;
  }

  async getVenueTypeById(id: number): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.findOne({
      where: { id },
      include: { all: true },
    });
    return venue_type;
  }

  async updateVenueTypeById(
    id: number,
    updateVenueTypeDto: UpdateVenueTypeDto
  ): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.update(updateVenueTypeDto, {
      where: { id },
      returning: true,
    });
    return venue_type[1][0];
  }

  async deleteVenuetypeById(id: number): Promise<number> {
    const venue_type = await this.venueTypeModel.destroy({ where: { id } });
    return venue_type;
  }
}
