import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { NotFoundException } from '@nestjs/common';
import { TicketEntity } from './entity/ticket.entity';
import { UpdateTicketsDto } from './dto/update-tickets.dto';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TicketsService', () => {
  let service: TicketsService;
  let repository;

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(TicketEntity),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    repository = module.get<Repository<TicketEntity>>(
      getRepositoryToken(TicketEntity),
    );
  });

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      const tickets: TicketEntity[] = [
        {
          id: 1,
          content: 'Ticket 1',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          ticketsDiscussions: [],
        },
        {
          id: 2,
          content: 'Ticket 2',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          ticketsDiscussions: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(tickets);

      expect(await service.findAll()).toEqual(tickets);
    });
  });

  describe('create', () => {
    it('should create a new ticket', async () => {
      const ticketData = { content: 'New Ticket' } as CreateTicketsDto;
      const newTicket: TicketEntity = {
        id: 1,
        content: 'New Ticket',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };
      jest.spyOn(repository, 'create').mockReturnValue(newTicket);
      jest.spyOn(repository, 'save').mockResolvedValue(newTicket);

      expect(await service.create(ticketData)).toEqual(newTicket);
    });
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const id = 1;
      const updatedTicketData = {
        content: 'Updated Ticket',
        status: true,
      } as UpdateTicketsDto;
      const updatedTicket: TicketEntity = {
        id,
        content: 'Updated Ticket',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedTicket);

      expect(await service.update(id, updatedTicketData)).toEqual(
        updatedTicket,
      );
    });
  });

  describe('findOne', () => {
    it('should return a ticket by ID', async () => {
      const id = 1;
      const foundTicket: TicketEntity = {
        id,
        content: 'Found Ticket',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(foundTicket);

      expect(await service.findOne(id)).toEqual(foundTicket);
    });
  });

  describe('delete', () => {
    it('should delete a ticket by ID', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      expect(await service.delete(id)).toEqual(undefined);
    });
  });
});
