import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from '../../../application/ports/input-driving/tournaments.service';
import {
  DEFAULT_STACK,
  InMemoryRepository,
} from '../../repositories/in-memo/InMemoryRepository';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('TournamentsController', () => {
  let controller: TournamentsController;

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
    describe('Add Player', () => {
      it('should call add player', async () => {
        const actual = await controller.addPlayer({ pseudo: 'test1' });
        expect(actual).toEqual({ pseudo: 'test1', points: DEFAULT_STACK });
      });

      it('should throw ConflictException if user already exist ', async () => {
        await controller.addPlayer({ pseudo: 'test1' });
        await expect(controller.addPlayer({ pseudo: 'test1' })).rejects.toThrow(
          ConflictException,
        );
        await expect(controller.addPlayer({ pseudo: 'test1' })).rejects.toThrow(
          'Pseudo: test1 already exist',
        );
      });
    });

    describe('Get Player', () => {
      it('should return player Info', async () => {
        await controller.addPlayer({ pseudo: 'test1' });
        const player = await controller.getPlayer('test1');
        expect(player).toEqual({
          pseudo: 'test1',
          points: 500,
        });
      });
      it('should throw a NotFoundException', async () => {
        await expect(controller.getPlayer('userInfo')).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('Update Player', () => {
      it('should call updatePlayerPoints', async () => {
        await controller.addPlayer({ pseudo: 'test1' });
        await controller.updatePlayerPoints('test1', { points: 200 });
        const actual = await controller.getPlayer('test1');
        expect(actual).toEqual({ pseudo: 'test1', points: 200 });
      });
      it('should throw a NotFoundException', async () => {
        await expect(
          controller.updatePlayerPoints('test1', { points: 200 }),
        ).rejects.toThrow(NotFoundException);
      });
    });

    it('should call delete player', async () => {
      await controller.addPlayer({ pseudo: 'test1' });
      await controller.deletePlayers();
      await expect(controller.getPlayer('userInfo')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should call get all player', async () => {
      await controller.addPlayer({ pseudo: 'p1' });
      await controller.addPlayer({ pseudo: 'p2' });
      await controller.updatePlayerPoints('p1', { points: 200 });

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
