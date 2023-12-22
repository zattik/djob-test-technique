import { TicketEntity } from '../../tickets/entity/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ticketsDiscussions' })
export class TicketsDiscussionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.ticketsDiscussions, {
    onDelete: 'CASCADE',
  })
  ticket: TicketEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
