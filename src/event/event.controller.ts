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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Event } from "./models/event.model";

@ApiTags("Event")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: "Event yaratish" })
  @ApiResponse({
    status: 201,
    description: "Dizayn show",
    type: Event,
  })
  @Post("create")
  @UseInterceptors(FileInterceptor("photo"))
  async createEvent(
    @Res() res: Response,
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() photo: any
  ) {
    const newEvent = await this.eventService.createEvent(createEventDto, photo);
    console.log(photo);

    return res.status(HttpStatus.OK).send({
      message: `New Event created successfully!`,
      data: newEvent,
    });
  }

  @ApiOperation({ summary: "Barcha Eventlar ro'yhati"})
  @ApiResponse({
    status: 200,
    description: "List of Event",
    type: [Event],
  }) 
  @Get("all")
  async getAllEvents(@Res() res: Response) {
    const events = await this.eventService.getAllEvents();
    if (!events) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Events founded succefully`,
      data: events,
    });
  }

  @ApiOperation({ summary: "Eventni o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Event deleted successfuly",
    type: Number,
  })
  @Get(":id/seats-sold")
  async getSoldSeats(@Res() res: Response, @Param("id") id: number) {
    const eventSold = await this.eventService.getSoldSeats(id);
    if (!eventSold) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Event founded TicketStatus Sold successfuly!`,
      data: eventSold,
    });
  }

  @ApiOperation({ summary: "Eventni id orqali ko'rib chiqish"})
  @ApiResponse({
    status: 200,
    description: "Event deleted successfuly",
    type: Number,
  })
  @Get(":id")
  async getEventById(@Res() res: Response, @Param("id") id: string) {
    const event = await this.eventService.getEventById(+id);
    if (!event) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Event founded By Id successfuly!`,
      data: event,
    });
  }

  @ApiOperation({ summary: "Eventni id orqali tahrirlash"})
  @ApiResponse({
    status: 200,
    description: "Event updated successfuly",
    type: Event,
  })
  @Patch(":id")
  async updateEventById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto
  ) {
    const updatedEvent = await this.eventService.updateEventById(
      +id,
      updateEventDto
    );
    if (!updatedEvent) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Event updated By Id successfuly!`,
      data: updatedEvent,
    });
  }

  @ApiOperation({ summary: "Eventni id orqali o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Event deleted successfuly",
    type: Number,
  })
  @Delete(":id")
  async deleteEventById(@Res() res: Response, @Param("id") id: string) {
    const deletedEvent = await this.eventService.deleteEventById(+id);
    if (!deletedEvent) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Event deleted By Id successfuly!`,
      data: deletedEvent,
    });
  }
}
