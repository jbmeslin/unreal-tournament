import { Module } from '@nestjs/common';
import { TournamentsService } from './application/ports/input-driving/tournaments.service';
import { InMemoryRepository } from './infra/repositories/in-memo/InMemoryRepository';
import { TournamentsController } from './infra/presenters/rest/tournaments.controller';

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
