import { Test, TestingModule } from '@nestjs/testing';
import { TicketsDiscussionsService } from './tickets-discussions.service';

describe('TicketsDiscussionsService', () => {
  let service: TicketsDiscussionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsDiscussionsService],
    }).compile();

    service = module.get<TicketsDiscussionsService>(TicketsDiscussionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
