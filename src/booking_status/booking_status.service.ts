import { Injectable } from "@nestjs/common";
import { CreateBookingStatusDto } from "./dto/create-booking_status.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking_status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { BookingStatus } from "./models/booking_status.model";

@Injectable()
export class BookingStatusService {
  constructor(
    @InjectModel(BookingStatus) private bookingStatusModel: typeof BookingStatus
  ) {}

  async createBookingStatus(
    createBookingStatusDto: CreateBookingStatusDto
  ): Promise<BookingStatus> {
    const booking_status = await this.bookingStatusModel.create(
      createBookingStatusDto
    );
    return booking_status;
  }

  async getAllBookingStatus(): Promise<BookingStatus[]> {
    const booking_status = await this.bookingStatusModel.findAll({
      include: { all: true },
    });
    return booking_status;
  }

  async getBookingStatusById(id: number): Promise<BookingStatus> {
    const booking_status = await this.bookingStatusModel.findOne({
      where: { id },
    });
    return booking_status;
  }

  async updatebookingStatusById(
    id: number,
    updateBookingStatusDto: UpdateBookingStatusDto
  ): Promise<BookingStatus> {
    const booking_status = await this.bookingStatusModel.update(
      updateBookingStatusDto,
      { where: { id }, returning: true }
    );
    return booking_status[1][0];
  }

  async deleteBookingStatusById(id: number): Promise<number> {
    const booking_status = await this.bookingStatusModel.destroy({
      where: { id },
    });
    return booking_status;
  }
}
