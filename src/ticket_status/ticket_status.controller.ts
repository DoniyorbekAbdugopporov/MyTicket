import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { TicketStatusService } from './ticket_status.service';
import { CreateTicketStatusDto } from './dto/create-ticket_status.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket_status.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Ticket Status")
@Controller("ticket-status")
export class TicketStatusController {
  constructor(private readonly ticketStatusService: TicketStatusService) {}

  @Post("create")
  async getAllTicketStaus(
    @Res() res: Response,
    @Body() createTicketStatusDto: CreateTicketStatusDto
  ) {
    const ticket_status = await this.ticketStatusService.createTicketStatus(
      createTicketStatusDto
    );
    return res.status(HttpStatus.OK).send({
      message: `New Ticket Status created successfully!`,
      data: ticket_status,
    });
  }

  @Get("all")
  async getAllTicketStatuses(@Res() res: Response) {
    const data = await this.ticketStatusService.getAllTicketStatuses();
    if (!data) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `All Ticket Status founded succefully`,
      data: data,
    });
  }

  @Get(":id")
  async getTicketStatusById(@Res() res: Response, @Param("id") id: string) {
    const ticket_status =
      await this.ticketStatusService.getTicketStatusById(+id);
    if (!ticket_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.FOUND).send({
      message: `Ticket Status founded By Id successfuly!`,
      data: ticket_status,
    });
  }

  @Patch(":id")
  async updateTicketStatusById(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateTicketStatusDto: UpdateTicketStatusDto
  ) {
    const ticket_status = await this.ticketStatusService.updateTicketStatusById(
      +id,
      updateTicketStatusDto
    );
    if (!ticket_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Ticket Status updated By Id successfuly!`,
      data: ticket_status,
    });
  }

  @Delete(":id")
  async deleteTicketStatusById(@Res() res: Response, @Param("id") id: string) {
    const ticket_status =
      await this.ticketStatusService.deleteticketStatusById(+id);
    if (!ticket_status) {
      throw new NotFoundException();
    }
    return res.status(HttpStatus.OK).send({
      message: `Ticket Status deleted By Id successfuly!`,
      data: ticket_status,
    });
  }
}
