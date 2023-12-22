import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketEntity } from './entity/ticket.entity';
import { UpdateTicketsDto } from './dto/update-tickets.dto';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { PropertyGuard } from '../guard/property/property.guard';
import { validate } from 'class-validator';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async findAll(): Promise<TicketEntity[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TicketEntity> {
    const ticket = await this.ticketsService.findOne(id);

    return ticket;
  }

  @Post()
  async createTicket(@Body() ticketData: CreateTicketsDto) {
    const validationErrors = await validate(ticketData);

    if (validationErrors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return this.ticketsService.create(ticketData);
  }
  @UseGuards(PropertyGuard)
  @Put(':id')
  async updateTicket(
    @Param('id') id: number,
    @Body() updatedTicketData: UpdateTicketsDto,
  ) {
    console.log({ updatedTicketData });

    const validationErrors = await validate(updatedTicketData);

    console.log({ validationErrors });
    if (validationErrors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return this.ticketsService.update(id, updatedTicketData);
  }

  @UseGuards(PropertyGuard)
  @Delete(':id')
  async deleteTicket(@Param('id') id: number) {
    const ticket = await this.ticketsService.findOne(id);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.ticketsService.delete(id);
  }
}
