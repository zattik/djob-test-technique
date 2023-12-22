import { Test, TestingModule } from '@nestjs/testing';
import { TicketsDiscussionsController } from './tickets-discussions.controller';

describe('TicketsDiscussionsController', () => {
  let controller: TicketsDiscussionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsDiscussionsController],
    }).compile();

    controller = module.get<TicketsDiscussionsController>(TicketsDiscussionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
