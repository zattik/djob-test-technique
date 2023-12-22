import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { TicketEntity } from './entity/ticket.entity';

export const Ticket = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<TicketEntity> => {
    const request = ctx.switchToHttp().getRequest();

    const { ticketId } = request.body;

    const ticketRepository = request.ticketRepository;

    const ticket: TicketEntity | undefined = await ticketRepository.findOneBy({
      id: ticketId,
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return data ? ticket[data] : ticket;
  },
);
