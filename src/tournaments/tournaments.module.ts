import { Module } from '@nestjs/common';
import { TournamentsController } from './infra/tournaments.controller';
import { TournamentsService } from './application/tournaments.service';
import { InMemoryRepository } from './stubs/InMemoryRepository';

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
