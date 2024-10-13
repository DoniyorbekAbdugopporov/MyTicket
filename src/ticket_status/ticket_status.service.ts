import { Injectable } from "@nestjs/common";
import { CreateTicketStatusDto } from "./dto/create-ticket_status.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket_status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { TicketStatus } from "./models/ticket_status.model";

@Injectable()
export class TicketStatusService {
  constructor(
    @InjectModel(TicketStatus) private ticketStatusModel: typeof TicketStatus
  ) {}

  async createTicketStatus(createTicketStatusDto: CreateTicketStatusDto): Promise<TicketStatus> {
    const ticket_status = await this.ticketStatusModel.create(
      createTicketStatusDto
    );
    return ticket_status;
  }

  async getAllTicketStatuses(): Promise<TicketStatus[]> {
    const ticket_statuses = await this.ticketStatusModel.findAll({
      include: { all: true },
    });
    return ticket_statuses;
  }

  async getTicketStatusById(id: number): Promise<TicketStatus> {
    const ticket_status = await this.ticketStatusModel.findOne({
      where: { id },
      include: { all: true },
    });
    return ticket_status;
  }

  async updateTicketStatusById(id: number, updateTicketStatusDto: UpdateTicketStatusDto): Promise<TicketStatus> {
    const ticket_status = await this.ticketStatusModel.update(updateTicketStatusDto, {
      where: { id },
      returning: true,
    });
    return ticket_status[1][0];
  }

  async deleteticketStatusById(id: number): Promise<number> {
    const ticket_status = await this.ticketStatusModel.destroy({
      where: { id },
    });
    return ticket_status;
  }
}
