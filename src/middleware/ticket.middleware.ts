import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { TicketEntity } from 'src/tickets/entity/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    (req as any).ticketRepository = this.ticketRepository;
    next();
  }
}
