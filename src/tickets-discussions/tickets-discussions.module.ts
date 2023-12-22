import { Module } from '@nestjs/common';
import { TicketsDiscussionsController } from './tickets-discussions.controller';
import { TicketsDiscussionsService } from './tickets-discussions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsDiscussionEntity } from './entity/tickets-discussion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsDiscussionEntity])],
  controllers: [TicketsDiscussionsController],
  providers: [TicketsDiscussionsService],
})
export class TicketsDiscussionsModule {}
