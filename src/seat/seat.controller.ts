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
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Seat (o'rindiqlar)")
@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post("create")
  async createSeat(@Res() res: Response, @Body() createSeatDto: CreateSeatDto) {
    const seat = await this.seatService.createSeat(createSeatDto);
    return res.status(HttpStatus.OK).send({
      message: `New Seat created successfully!`,
      data: seat,
    });
  }

  @Get("all")
  async getAllSeats(@Res() res: Response) {
    const seats = await this.seatService.getAllSeats();
    if (!seats) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Seats founded succefully`,
      data: seats,
    });
  }

  @Get(":id")
  async getSeatById(@Res() res: Response, @Param("id") id: string) {
    const seat = await this.seatService.getSeatById(+id);
    if (!seat) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Seat founded By Id successfuly!`,
      data: seat,
    });
  }

  @Patch(":id")
  async updateSeatById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateSeatDto: UpdateSeatDto
  ) {
    const seat = await this.seatService.updateSeatById(+id, updateSeatDto);
    if (!seat) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Seat updated By Id successfuly!`,
      data: seat,
    });
  }

  @Delete(":id")
  async deleteSeatById(@Res() res: Response, @Param("id") id: string) {
    const seat = await this.seatService.deleteSeatById(+id);
    if (!seat) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Seat deleted By Id successfuly!`,
      data: seat,
    });
  }
}
