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
} from "@nestjs/common";
import { BookingStatusService } from "./booking_status.service";
import { CreateBookingStatusDto } from "./dto/create-booking_status.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking_status.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingStatus } from "./models/booking_status.model";

@ApiTags("Booking status")
@Controller("booking-status")
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @ApiOperation({ summary: "Bookingga yangi status qo'shish" })
  @ApiResponse({
    status: 200,
    description: "Booking status qoshish",
    type: BookingStatus,
  })
  @Post("create")
  async createBookingStatus(
    @Res() res: Response,
    @Body() createBookingStatusDto: CreateBookingStatusDto
  ) {
    const booking_status = await this.bookingStatusService.createBookingStatus(
      createBookingStatusDto
    );
    return res.status(HttpStatus.OK).send({
      message: `New Booking Status created successfully!`,
      data: booking_status,
    });
  }

  @ApiOperation({ summary: "Barcha booking statuslarni ro'yhati" })
  @ApiResponse({
    status: 200,
    description: "List of Booking status",
    type: [BookingStatus],
  })
  @Get("all")
  async getAllBookingStatus(@Res() res: Response) {
    const data = await this.bookingStatusService.getAllBookingStatus();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.CREATED).send({
      message: `All Booking Status founded successfully!`,
      data: data,
    });
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ID bo'yicha ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Booking Status By Id",
    type: BookingStatus,
  })
  @Get(":id")
  async getBookingStatusById(@Res() res: Response, @Param("id") id: string) {
    const booking_status =
      await this.bookingStatusService.getBookingStatusById(+id);
    if (!booking_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Booking Status founded By Id successfuly!`,
      data: booking_status,
    });
  }

  @ApiOperation({ summary: "booking statusni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update Booking status By Id",
    type: BookingStatus,
  })
  @Patch(":id")
  async updateBookingStatusById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto
  ) {
    const booking_status =
      await this.bookingStatusService.updatebookingStatusById(
        +id,
        updateBookingStatusDto
      );
    if (!booking_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Booking Status updated By Id successfuly!`,
      data: booking_status,
    });
  }

  @ApiOperation({ summary: "Booking statusni ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Booking status By Id",
    type: BookingStatus,
  })
  @Delete(":id")
  async deleteBookingStatusById(@Res() res: Response, @Param("id") id: string) {
    const booking_status =
      await this.bookingStatusService.deleteBookingStatusById(+id);
    if (!booking_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Booking Status deleted By Id successfuly!`,
      data: booking_status,
    });
  }
}
