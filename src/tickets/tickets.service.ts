import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entity/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketsDto } from './dto/update-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async findAll() {
    return this.ticketRepository.find();
  }

  async create(ticketData: CreateTicketsDto) {
    const { content, status } = ticketData;

    const newTicket = this.ticketRepository.create({
      content,
      status,
    });
    return this.ticketRepository.save(newTicket);
  }

  async update(
    id: number,
    updatedTicketData: UpdateTicketsDto,
  ): Promise<TicketEntity> {
    const { content, status } = updatedTicketData;

    await this.ticketRepository.update(id, { content, status });

    return this.ticketRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<TicketEntity> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id } });

      return ticket;
    } catch (error) {
      throw new NotFoundException('not found ticket with this id');
    }
  }

  async delete(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
