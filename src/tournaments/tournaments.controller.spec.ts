import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

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
            getTournament: jest
              .fn()
              .mockReturnValue({ name: 'test1', players: [] }),
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
    it('should return a tournament', () => {
      expect(controller.getTournament(1)).toEqual({
        name: 'test1',
        players: [],
      });
    });
  });
});
