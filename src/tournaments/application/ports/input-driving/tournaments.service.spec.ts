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
      expect(actual).toEqual({ pseudo: 'userInfo', points: DEFAULT_STACK });
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
      await service.updatePlayerPoints('userInfo', 200);
      const actual = await service.getPlayerInfo('userInfo');
      expect(actual).toEqual({ pseudo: 'userInfo', points: 200 });
    });

    it('should throw a PlayerNotFoundException', async () => {
      await expect(service.updatePlayerPoints('userInfo', 200)).rejects.toThrow(
        PlayerNotFoundException,
      );
    });
  });

  it('should call delete player', async () => {
    await service.addPlayer('userInfo');
    await service.deletePlayers();
    await expect(service.getPlayerInfo('userInfo')).rejects.toThrow(
      PlayerNotFoundException,
    );
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
