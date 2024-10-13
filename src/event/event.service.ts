import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./models/event.model";
import { InjectModel } from "@nestjs/sequelize";
import { Ticket } from "../ticket/models/ticket.model";
import { Seat } from "../seat/models/seat.model";
import { TicketStatus } from "../ticket_status/models/ticket_status.model";
import { FileService } from "../file/file.service";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private eventModel: typeof Event,
    private readonly fileService: FileService
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    image: any
  ): Promise<Event> {
    const fileName = await this.fileService.saveFile(image);
    const event_photo = await this.eventModel.create({...createEventDto, photo: fileName} )
    return event_photo;
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventModel.findAll({ include: { all: true } });
    return events;
  }

  async getSoldSeats(eventId: number) {
    return this.eventModel.findOne({
      where: { id: eventId },
      include: [
        {
          model: Ticket,
          where: { ticketStatusId: 1 },
          include: [
            {
              model: Seat,
            },
            {
              model: TicketStatus,
              where: { name: "sotilgan" },
            },
          ],
        },
      ],
    });
  }

  async getEventById(id: number): Promise<Event> {
    return this.eventModel.findOne({ where: { id }, include: { all: true } });
  }

  async updateEventById(
    id: number,
    updateEventDto: UpdateEventDto
  ): Promise<Event> {
    const event = await this.eventModel.update(updateEventDto, {
      where: { id },
      returning: true,
    });
    return event[1][0];
  }

  async deleteEventById(id: number): Promise<number> {
    return this.eventModel.destroy({ where: { id } });
  }
}
