import { Module } from '@nestjs/common';
import { TournamentsService } from './application/ports/input-driving/tournaments.service';
import { InMemoryRepository } from './infra/repositories/in-memo/InMemoryRepository';
import { TournamentsController } from './infra/presenters/rest/tournaments.controller';
import { DatabaseModule } from '../database/database.module';
import { MongoRepository } from './infra/repositories/mongo/MongoRepository';
import { TournamentProviders } from './infra/repositories/mongo/TournamentProviders';

@Module({
  imports: [DatabaseModule],

  controllers: [TournamentsController],

  providers: [
    TournamentsService,
    {
      provide: 'ITournamentRepository',
      useClass: MongoRepository,
      // useClass: InMemoryRepository,
    },
    ...TournamentProviders,
  ],
})
export class TournamentsModule {}
