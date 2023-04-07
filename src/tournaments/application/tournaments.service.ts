import { Inject, Injectable } from '@nestjs/common';
import { Tournament } from '../domain/models/tournament.interface';
import { ITournamentRepository } from '../domain/repositories/ITournament.repository';
import { Player } from '../domain/models/Player';

@Injectable()
export class TournamentsService implements ITournamentRepository {
  constructor(
    @Inject('ITournamentRepository')
    private readonly tournamentRepository: ITournamentRepository,
  ) {}

  addPlayer(pseudo: string): Promise<Player> {
    return this.tournamentRepository.addPlayer(pseudo);
  }

  deletePlayers(): Promise<void> {
    return this.tournamentRepository.deletePlayers();
  }

  getPlayerInfo(pseudo: string): Promise<Player> {
    return this.tournamentRepository.getPlayerInfo(pseudo);
  }

  getPlayers(): Promise<Player[]> {
    return this.tournamentRepository.getPlayers();
  }

  updatePlayerPoints(pseudo: string, points): Promise<void> {
    return this.tournamentRepository.updatePlayerPoints(pseudo, points);
  }
}
