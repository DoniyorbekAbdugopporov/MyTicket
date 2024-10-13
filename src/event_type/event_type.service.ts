import { Injectable } from "@nestjs/common";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { EventType } from "./models/event_type.model";

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType) private eventTypeModel: typeof EventType
  ) {}

  async createEventType(
    createEventTypeDto: CreateEventTypeDto
  ): Promise<EventType> {
    return await this.eventTypeModel.create(createEventTypeDto);
  }

  async getAllEventTypes(): Promise<EventType[]> {
    const events = await this.eventTypeModel.findAll({
      include: { all: true },
    });
    return events;
  }

  async getEventTypeById(id: number): Promise<EventType> {
    const event_type = await this.eventTypeModel.findOne({
      where: { id },
      include: { all: true },
    });
    return event_type;
  }

  async updateEventTypeById(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto
  ): Promise<EventType> {
    const updated_event_type = await this.eventTypeModel.update(
      updateEventTypeDto,
      { where: { id }, returning: true }
    );
    return updated_event_type[1][0];
  }

  async deleteEventTypeById(id: number): Promise<number> {
    const deleted_event_type = await this.eventTypeModel.destroy({ where: { id } });
    return deleted_event_type;
  }
}
