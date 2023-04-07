import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from '../application/tournaments.service';

describe('TournamentsController', () => {
  let controller: TournamentsController;
  // let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentsController],
      providers: [
        {
          provide: TournamentsService,
          useValue: {
            getPlayerInfo: jest
              .fn()
              .mockResolvedValue({ pseudo: 'test1', points: 500 }),
          },
        },
      ],
    }).compile();

    controller = module.get<TournamentsController>(TournamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Find Tournament', () => {
    it('should return player Info', async () => {
      const player = await controller.getPlayer('test1');
      expect(player).toEqual({
        pseudo: 'test1',
        points: 500,
      });
    });
  });
});
