import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entity/ticket.entity';
import { PropertyGuard } from 'src/guard/property/property.guard';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketsController],
  providers: [TicketsService, PropertyGuard],
})
export class TicketsModule {}
