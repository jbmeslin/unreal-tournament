import { Inject, Injectable } from '@nestjs/common';
import { ITournamentRepository } from '../output-driven/ITournament.repository';
import { Player } from '../../../domain/models/Player';
import { PlayerAlreadyExistException } from '../../../domain/exceptions/PlayerAlreadyExistException';
import { PlayerNotFoundException } from '../../../domain/exceptions/PlayerNotFoundException';

@Injectable()
export class TournamentsService {
  constructor(
    @Inject('ITournamentRepository')
    private readonly tournamentRepository: ITournamentRepository,
  ) {}

  async addPlayer(pseudo: string): Promise<Player> {
    const player = await this.tournamentRepository.getPlayerInfo(pseudo);
    if (player) {
      throw new PlayerAlreadyExistException(pseudo);
    }
    return this.tournamentRepository.addPlayer(pseudo);
  }

  deletePlayers(): Promise<void> {
    return this.tournamentRepository.deletePlayers();
  }

  async getPlayerInfo(pseudo: string): Promise<Player> {
    const player = await this.tournamentRepository.getPlayerInfo(pseudo);
    if (!player) {
      throw new PlayerNotFoundException(pseudo);
    }
    return player;
  }

  getPlayers(): Promise<Player[]> {
    return this.tournamentRepository.getPlayers();
  }

  async updatePlayerPoints(pseudo: string, points): Promise<void> {
    const player = await this.tournamentRepository.getPlayerInfo(pseudo);
    if (!player) {
      throw new PlayerNotFoundException(pseudo);
    }
    return this.tournamentRepository.updatePlayerPoints({ pseudo, points });
  }
}
