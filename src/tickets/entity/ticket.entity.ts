import { TicketsDiscussionEntity } from '../../tickets-discussions/entity/tickets-discussion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  status: boolean;

  @OneToMany(
    () => TicketsDiscussionEntity,
    (ticketsDiscussion) => ticketsDiscussion.ticket,
  )
  ticketsDiscussions: TicketsDiscussionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
