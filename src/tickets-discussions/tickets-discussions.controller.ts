import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketsDiscussionsService } from './tickets-discussions.service';
import { Ticket } from 'src/tickets/tickets.decorator';
import { TicketEntity } from 'src/tickets/entity/ticket.entity';
import { CreateTicketsDiscussionsDto } from './dto/create-tickets-discussions.dto';

@Controller('tickets-discussions')
export class TicketsDiscussionsController {
  constructor(
    private readonly ticketsDiscussionsService: TicketsDiscussionsService,
  ) {}

  @Get(':id')
  getTicketDiscussion(@Param('id') ticketDiscussionId: number) {
    return this.ticketsDiscussionsService.getTicketDiscussion(
      ticketDiscussionId,
    );
  }

  @Get('allDiscussion')
  getDiscussionByTicketId(@Ticket('id') ticketId: number) {
    return this.ticketsDiscussionsService.findAllDiscussuionByTicketId(
      ticketId,
    );
  }

  @Post()
  postTicketDiscussion(
    @Ticket() ticket: TicketEntity,
    @Body() ticketsDiscussionData: CreateTicketsDiscussionsDto,
  ) {
    return this.ticketsDiscussionsService.postTicketDiscussion(
      ticket,
      ticketsDiscussionData,
    );
  }
}
