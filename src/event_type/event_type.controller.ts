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
import { EventTypeService } from "./event_type.service";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EventType } from "./models/event_type.model";

@ApiTags("EventType")
@Controller("event-type")
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @ApiOperation({ summary: "Event Type yaratish" })
  @ApiResponse({
    status: 201,
    description: "Konsert",
    type: EventType,
  })
  @Post("create")
  async createEventType(
    @Res() res: Response,
    @Body() createEventTypeDto: CreateEventTypeDto
  ) {
    const new_event_type =
      await this.eventTypeService.createEventType(createEventTypeDto);
    return res.status(HttpStatus.OK).send({
      message: `New Event Type created successfully!`,
      data: new_event_type,
    });
  }

  @ApiOperation({summary: "Create Event Type"})
  @ApiResponse({
    status: 200,
    description: "List of Event Type",
    type: [EventType],
  })
  @Get("all")
  async getAllEventTypes(@Res() res: Response) {
    const event_types = await this.eventTypeService.getAllEventTypes();
    if (!event_types) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Event Types founded succefully`,
      data: event_types,
    });
  }

  @ApiOperation({summary: "Get Event Type by ID"})
  @ApiResponse({
    status: 200,
    description: "Get Event Type By Id",
    type: EventType,
  })
  @Get(":id")
  async getEventTypeById(@Res() res: Response, @Param("id") id: string) {
    const event_type = await this.eventTypeService.getEventTypeById(+id);
    if (!event_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Event Type founded By Id successfuly!`,
      data: event_type,
    });
  }

  @ApiOperation({summary: "Update Event Type by ID"})
  @ApiResponse({
    status: 200,
    description: "Update Event Type By Id",
    type: EventType,
  })
  @Patch(":id")
  async updatedEventTypeById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto
  ) {
    const updated_event_type = await this.eventTypeService.updateEventTypeById(
      +id,
      updateEventTypeDto
    );
    if (!updated_event_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Event Type updated By Id successfuly!`,
      data: updated_event_type,
    });
  }

  @ApiOperation({summary: "Delete Event Type by ID"})
  @ApiResponse({
    status: 200,
    description: "Delete Event Type By Id",
    type: EventType,
  })
  @Delete(":id")
  async deleteEventTypeById(@Res() res: Response, @Param("id") id: string) {
    const deleted_event_type =
      await this.eventTypeService.deleteEventTypeById(+id);
    if (!deleted_event_type) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Event Type deleted By Id successfuly!`,
      data: deleted_event_type,
    });
  }
}
