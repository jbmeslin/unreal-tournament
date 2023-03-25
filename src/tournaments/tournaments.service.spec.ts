import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';

describe('TournamentsService', () => {
  let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentsService],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the tournament', () => {
    expect(service.getTournament(1)).toEqual({
      name: 'to be implemented 1',
      players: [],
    });
  });
});
