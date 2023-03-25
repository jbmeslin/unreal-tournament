import { Controller, Get, Param } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { Tournament } from './models/tournament.interface';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly service: TournamentsService) {}

  @Get(':id')
  getTournament(@Param('id') id: number): Tournament {
    return this.service.getTournament(id);
  }
}
