import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';
import { DEFAULT_STACK, InMemoryRepository } from '../stubs/InMemoryRepository';

describe('TournamentsService', () => {
  let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        {
          provide: 'ITournamentRepository',
          useClass: InMemoryRepository, //use stup to test
        },
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call add player', async () => {
    const actual = await service.addPlayer('userTest');
    expect(actual).toEqual({ pseudo: 'userTest', points: DEFAULT_STACK });
  });

  it('should call getPlayerInfo', async () => {
    await service.addPlayer('userInfo');
    const actual = await service.getPlayerInfo('userInfo');
    expect(actual).toEqual({ pseudo: 'userInfo', points: DEFAULT_STACK });
  });

  it('should call updatePlayerPoints', async () => {
    await service.addPlayer('userInfo');
    await service.updatePlayerPoints('userInfo', 200);
    const actual = await service.getPlayerInfo('userInfo');
    expect(actual).toEqual({ pseudo: 'userInfo', points: 200 });
  });

  it('should call delete player', async () => {
    await service.addPlayer('userInfo');
    await service.deletePlayers();
    const actual = await service.getPlayerInfo('userInfo');
    expect(actual).toEqual(undefined);
  });

  it('should call get all player', async () => {
    await service.addPlayer('p1');
    await service.addPlayer('p2');
    await service.updatePlayerPoints('p1', 200);

    const actual = await service.getPlayers();
    expect(actual).toEqual([
      {
        points: 200,
        pseudo: 'p1',
      },
      {
        points: 500,
        pseudo: 'p2',
      },
    ]);
  });
});
