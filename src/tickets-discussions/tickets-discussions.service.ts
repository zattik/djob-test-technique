import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsDiscussionEntity } from './entity/tickets-discussion.entity';
import { Repository } from 'typeorm';
import { TicketEntity } from 'src/tickets/entity/ticket.entity';
import { CreateTicketsDiscussionsDto } from './dto/create-tickets-discussions.dto';

@Injectable()
export class TicketsDiscussionsService {
  constructor(
    @InjectRepository(TicketsDiscussionEntity)
    private readonly ticketsDiscussionRepository: Repository<TicketsDiscussionEntity>,
  ) {}

  getTicketDiscussion(
    ticketDiscussionId: number,
  ): Promise<TicketsDiscussionEntity> {
    return this.ticketsDiscussionRepository.findOneBy({
      id: ticketDiscussionId,
    });
  }

  async findAllDiscussuionByTicketId(
    ticketId: number,
  ): Promise<TicketsDiscussionEntity[]> {
    return this.ticketsDiscussionRepository.find({
      where: { ticket: { id: ticketId } },
    });
  }
  async postTicketDiscussion(
    ticketOfDiscussion: TicketEntity,
    ticketDiscussionData: CreateTicketsDiscussionsDto,
  ) {
    const { content } = ticketDiscussionData;

    const newTicketDiscussion = this.ticketsDiscussionRepository.create({
      ticket: ticketOfDiscussion,
      content,
    });

    return this.ticketsDiscussionRepository.save(newTicketDiscussion);
  }
}
