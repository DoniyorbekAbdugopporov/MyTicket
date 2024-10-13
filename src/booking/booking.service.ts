import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./models/booking.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdAt = new Date();
    const finishedAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
    return this.bookingModel.create({
      ...createBookingDto,
      createdAt,
      finishedAt,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Booking> {
    return this.bookingModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto
  ): Promise<Booking> {
    const booking = await this.bookingModel.update(updateBookingDto, {
      where: { id },
      returning: true,
    });
    return booking[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.bookingModel.destroy({ where: { id } });
  }
}
