import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SeatType } from "./models/seat_type.model";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatType) private seatTypeModel: typeof SeatType) {}

  async createSeatType(
    createSeatTypeDto: CreateSeatTypeDto
  ): Promise<SeatType> {
    const seat_type = await this.seatTypeModel.create(createSeatTypeDto);
    return seat_type;
  }

  async getAllSeatTypes(): Promise<SeatType[]> {
    const seat_types = await this.seatTypeModel.findAll({
      include: { all: true },
    });
    return seat_types;
  }

  async getSeatTypeByName(name: string): Promise<SeatType> {
    const seat_type = await this.seatTypeModel.findOne({
      where: { name },
      include: { all: true },
    });
    return seat_type;
  }

  async getSeatTypeById(id: number): Promise<SeatType> {
    const seat_type = await this.seatTypeModel.findOne({
      where: { id },
      include: { all: true },
    });
    return seat_type;
  }

  async updateSeatTypeById(
    id: number,
    updateSeatTypeDto: UpdateSeatTypeDto
  ): Promise<SeatType> {
    const seat_type = await this.seatTypeModel.update(updateSeatTypeDto, {
      where: { id },
      returning: true,
    });
    return seat_type[1][0];
  }

  async deleteSeatTypeById(id: number): Promise<number> {
    const seat_type = await this.seatTypeModel.destroy({ where: { id } });
    return seat_type;
  }
}
