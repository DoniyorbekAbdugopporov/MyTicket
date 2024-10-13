import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { SeatTypeService } from "./seat_type.service";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { Response } from "express";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Seat Type")
@Controller("seat-type")
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @Post("create")
  async createSeatType(
    @Res() res: Response,
    @Body() createSeatTypeDto: CreateSeatTypeDto
  ) {
    const new_seat_type =
      await this.seatTypeService.createSeatType(createSeatTypeDto);
    return res.status(HttpStatus.CREATED).send({
      message: `New Seat Type created successfully!`,
      data: new_seat_type,
    });
  }

  @Get("all")
  async getAllSeatTypes(@Res() res: Response) {
    const all_seat_types = await this.seatTypeService.getAllSeatTypes();
    if (!all_seat_types) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Seat Type Found Successfully!`,
      data: all_seat_types,
    });
  }

  @Get("search")
  async getSeatTypeByName(@Res() res: Response, @Query("name") name: string) {
    const seat_type = await this.seatTypeService.getSeatTypeByName(name);
    if (!seat_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Seat Type founded By name successfully!`,
      data: seat_type,
    });
  }

  @Get(":id")
  async getSeatTypeById(@Res() res: Response, @Param("id") id: number) {
    const seat_type = await this.seatTypeService.getSeatTypeById(id);
    if (!seat_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Seat Type founded By Id successfully!`,
      data: seat_type,
    });
  }

  @Patch(":id")
  async updateSeatTypeById(
    @Res() res: Response,
    @Param("id") id: number,
    @Body() updateSeatTypeDto: UpdateSeatTypeDto
  ) {
    const seat_type = await this.seatTypeService.updateSeatTypeById(
      id,
      updateSeatTypeDto
    );
    if (!seat_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Seat Type Updated By Id successfully!`,
      data: seat_type,
    });
  }

  @Delete(":id")
  async deleteSeatTypeById(@Res() res: Response, @Param("id") id: number) {
    const seat_type = await this.seatTypeService.deleteSeatTypeById(id);
    if (!seat_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Seat Type Deleted By Id successfully!`,
      data: seat_type,
    });
  }
}
