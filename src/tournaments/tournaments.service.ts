import { Injectable } from '@nestjs/common';
import { Tournament } from './models/tournament.interface';

@Injectable()
export class TournamentsService {
  getTournament(id: number): Tournament {
    return { name: `to be implemented ${id}`, players: [] };
  }
}
