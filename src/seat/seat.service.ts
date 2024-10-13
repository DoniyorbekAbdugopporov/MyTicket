import { Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Seat } from "./models/seat.model";

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat) private seatModel: typeof Seat) {}

  async createSeat(createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat = await this.seatModel.create(createSeatDto);
    return seat;
  }

  async getAllSeats(): Promise<Seat[]> {
    const seats = await this.seatModel.findAll({ include: { all: true } });
    return seats;
  }

  async getSeatById(id: number): Promise<Seat> {
    const seat = await this.seatModel.findOne({
      where: { id },
      include: { all: true },
    });
    return seat;
  }

  async updateSeatById(
    id: number,
    updateSeatDto: UpdateSeatDto
  ): Promise<Seat> {
    const seat = await this.seatModel.update(updateSeatDto, {
      where: { id },
      returning: true,
    });
    return seat[1][0];
  }

  async deleteSeatById(id: number): Promise<number> {
    const seat = await this.seatModel.destroy({ where: { id } });
    return seat;
  }
}
