import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';
import { PlayerAlreadyExistException } from '../../../domain/exceptions/PlayerAlreadyExistException';

import {
  DEFAULT_STACK,
  InMemoryRepository,
} from '../../../infra/repositories/in-memo/InMemoryRepository';
import { PlayerNotFoundException } from '../../../domain/exceptions/PlayerNotFoundException';

describe('TournamentsService', () => {
  let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        {
          provide: 'ITournamentRepository',
          useClass: InMemoryRepository, //should use in Memo fom infra to test
        },
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Add Player', () => {
    it('should call add player', async () => {
      const actual = await service.addPlayer('userTest');
      expect(actual).toEqual({ pseudo: 'userTest', points: DEFAULT_STACK });
    });

    it('should throw an AlreadyPlayerExistException', async () => {
      await service.addPlayer('userTest');
      // const error = await service.addPlayer('userTest');
      await expect(service.addPlayer('userTest')).rejects.toThrow(
        PlayerAlreadyExistException,
      );
      await expect(service.addPlayer('userTest')).rejects.toThrow(
        'Pseudo: userTest already exist',
      );
    });
  });

  describe('Get Player', () => {
    it('should call getPlayerInfo', async () => {
      await service.addPlayer('userInfo');
      const actual = await service.getPlayerInfo('userInfo');
      expect(actual).toEqual({
        pseudo: 'userInfo',
        points: DEFAULT_STACK,
        position: 1,
      });
    });

    it('should throw a PlayerNotFoundException', async () => {
      await expect(service.getPlayerInfo('userInfo')).rejects.toThrow(
        PlayerNotFoundException,
      );
      await expect(service.getPlayerInfo('userInfo')).rejects.toThrow(
        'Player: userInfo not found',
      );
    });
  });
  describe('Update Player', () => {
    it('should call updatePlayerPoints', async () => {
      await service.addPlayer('userInfo');
      await service.updatePlayerPoints('userInfo', 20000);
      const actual = await service.getPlayerInfo('userInfo');
      expect(actual).toEqual({
        pseudo: 'userInfo',
        points: 20000,
        position: 1,
      });
    });

    it('should call updatePlayerPoints and return the good position', async () => {
      await service.addPlayer('p1');
      await service.addPlayer('p2');
      await service.updatePlayerPoints('p1', 20000);
      const actual = await service.getPlayerInfo('p1');
      expect(actual).toEqual({
        pseudo: 'p1',
        points: 20000,
        position: 2,
      });
    });

    it('should throw a PlayerNotFoundException', async () => {
      await expect(
        service.updatePlayerPoints('userInfo', 20000),
      ).rejects.toThrow(PlayerNotFoundException);
    });
  });

  describe('Get ALL Players', () => {
    it('should call getPlayers', async () => {
      await service.addPlayer('p1');
      await service.addPlayer('p2');

      const actual = await service.getPlayers();
      expect(actual).toEqual([
        {
          points: 25000,
          pseudo: 'p1',
        },
        {
          points: 25000,
          pseudo: 'p2',
        },
      ]);
    });
    it('should getPlayers sorted by points', async () => {
      await service.addPlayer('p1');
      await service.addPlayer('p2');
      await service.addPlayer('p3');
      await service.updatePlayerPoints('p3', 30000);
      await service.updatePlayerPoints('p2', 20000);

      const actual = await service.getPlayers();
      expect(actual).toEqual([
        {
          points: 30000,
          pseudo: 'p3',
        },
        {
          points: 25000,
          pseudo: 'p1',
        },
        {
          points: 20000,
          pseudo: 'p2',
        },
      ]);
    });
  });

  it('should call delete player', async () => {
    await service.addPlayer('userInfo');
    await service.deletePlayers();
    await expect(service.getPlayerInfo('userInfo')).rejects.toThrow(
      PlayerNotFoundException,
    );
  });
});
