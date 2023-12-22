import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketEntity } from './entity/ticket.entity';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketsDto } from './dto/update-tickets.dto';
import { NotFoundException } from '@nestjs/common';
import { PropertyGuard } from '../guard/property/property.guard';

jest.mock('../guard/property/property.guard', () => ({
  PropertyGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true),
  })),
}));
describe('TicketsController', () => {
  let controller: TicketsController;
  let mockService: jest.Mocked<TicketsService>;
  let guard: PropertyGuard;

  beforeEach(async () => {
    guard = new PropertyGuard();

    mockService = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        { provide: TicketsService, useValue: mockService },
        PropertyGuard,
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    guard = module.get<PropertyGuard>(PropertyGuard);
  });

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      const tickets: TicketEntity[] = [
        {
          id: 1,
          content: 'djob is amazing',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          ticketsDiscussions: [],
        },
      ];

      mockService.findAll.mockResolvedValue(tickets);

      const result = await controller.findAll();

      expect(result).toEqual(tickets);

      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('createTicket', () => {
    it('should create a new ticket', async () => {
      const ticketData: CreateTicketsDto = {
        content: 'New Ticket',
        status: false,
      };
      const createdTicket: TicketEntity = {
        id: 1,
        content: 'New Ticket',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };

      jest.spyOn(guard, 'canActivate').mockReturnValue(true);

      mockService.create.mockResolvedValue(createdTicket);

      const result = await controller.createTicket(ticketData);

      expect(result).toEqual(createdTicket);
      expect(mockService.create).toHaveBeenCalledWith(ticketData);
    });
  });
  describe('updateTicket', () => {
    it('should update a ticket by ID', async () => {
      const id = 1;
      const updatedTicketData: UpdateTicketsDto = {
        content: 'Updated Ticket',
        status: true,
      };
      const updatedTicket: TicketEntity = {
        id,
        content: 'Updated Ticket',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };
      mockService.update.mockResolvedValue(updatedTicket);

      const result = await controller.updateTicket(id, updatedTicketData);

      expect(result).toEqual(updatedTicket);
      expect(mockService.update).toHaveBeenCalledWith(id, updatedTicketData);
    });
  });
  describe('deleteTicket', () => {
    it('should delete a ticket by ID', async () => {
      const id = 1;
      const existingTicket: TicketEntity = {
        id,
        content: 'Ticket to delete',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketsDiscussions: [],
      };
      mockService.findOne.mockResolvedValue(existingTicket);
      mockService.delete.mockResolvedValue();

      await expect(controller.deleteTicket(id)).resolves.toEqual(undefined);

      expect(mockService.findOne).toHaveBeenCalledWith(id);
      expect(mockService.delete).toHaveBeenCalledWith(id);
    });
    it('should throw NotFoundException for non-existing ticket', async () => {
      const id = 2;
      mockService.findOne.mockResolvedValue(null);

      expect(controller.deleteTicket(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(mockService.findOne).toHaveBeenCalledWith(id);
      expect(mockService.delete).not.toHaveBeenCalled();
    });
  });
});
