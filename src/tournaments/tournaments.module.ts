import { Module } from '@nestjs/common';
import { TournamentsService } from './application/tournaments.service';
import { InMemoryRepository } from './stubs/InMemoryRepository';
import { TournamentsController } from './infra/controller/tournaments.controller';

@Module({
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    {
      provide: 'ITournamentRepository',
      useClass: InMemoryRepository,
    },
  ],
})
export class TournamentsModule {}
