import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from '../../application/tournaments.service';
import {
  DEFAULT_STACK,
  InMemoryRepository,
} from '../../stubs/InMemoryRepository';

describe('TournamentsController', () => {
  let controller: TournamentsController;
  // let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentsController],
      providers: [
        TournamentsService,
        {
          provide: 'ITournamentRepository',
          useClass: InMemoryRepository, //use stup to test
        },
      ],
    }).compile();

    controller = module.get<TournamentsController>(TournamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Tournament API', () => {
    it('should call add player', async () => {
      const actual = await controller.addPlayer({ pseudo: 'test1' });
      expect(actual).toEqual({ pseudo: 'test1', points: DEFAULT_STACK });
    });

    it('should return player Info', async () => {
      await controller.addPlayer({ pseudo: 'test1' });
      const player = await controller.getPlayer('test1');
      expect(player).toEqual({
        pseudo: 'test1',
        points: 500,
      });
    });

    it('should call updatePlayerPoints', async () => {
      await controller.addPlayer({ pseudo: 'test1' });
      await controller.updatePlayerPoints({ pseudo: 'test1', points: 200 });
      const actual = await controller.getPlayer('test1');
      expect(actual).toEqual({ pseudo: 'test1', points: 200 });
    });

    it('should call delete player', async () => {
      await controller.addPlayer({ pseudo: 'test1' });
      await controller.deletePlayers();
      const actual = await controller.getPlayer('userInfo');
      expect(actual).toEqual(undefined);
    });

    it('should call get all player', async () => {
      await controller.addPlayer({ pseudo: 'p1' });
      await controller.addPlayer({ pseudo: 'p2' });
      await controller.updatePlayerPoints({ pseudo: 'p1', points: 200 });

      const actual = await controller.getPlayers();
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
});
