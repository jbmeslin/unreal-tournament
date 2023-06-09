import { Inject, Injectable } from '@nestjs/common';
import { ITournamentRepository } from '../output-driven/ITournament.repository';
import { Player, PlayerInfo } from '../../../domain/models/Player';
import { PlayerAlreadyExistException } from '../../../domain/exceptions/PlayerAlreadyExistException';
import { PlayerNotFoundException } from '../../../domain/exceptions/PlayerNotFoundException';
import { DEFAULT_STACK } from '../../../domain/models/Tournament';

@Injectable()
export class TournamentsService {
  constructor(
    @Inject('ITournamentRepository')
    private readonly tournamentRepository: ITournamentRepository,
  ) {}

  async addPlayer(pseudo: string): Promise<Player> {
    const player = await this.tournamentRepository.getPlayer(pseudo);
    if (player) {
      throw new PlayerAlreadyExistException(pseudo);
    }
    return this.tournamentRepository.addPlayer(pseudo, DEFAULT_STACK);
  }

  deletePlayers(): Promise<void> {
    return this.tournamentRepository.deletePlayers();
  }

  async getPlayerInfo(pseudo: string): Promise<PlayerInfo> {
    const players = await this.getPlayers();
    const player = players.find((p) => {
      return p.pseudo === pseudo;
    });

    if (!player) {
      throw new PlayerNotFoundException(pseudo);
    }

    // GetPlayerPositon may be should be implemented in Tournament object
    const position = players.lastIndexOf(player);
    return { ...player, position: position + 1 };
  }

  async getPlayers(): Promise<Player[]> {
    let players = await this.tournamentRepository.getPlayers();

    //TODO refactoring
    // sortPlayers  should be implemented in Tournament Domain object
    // or ask the repo to do it faster add less memory/cpu usage for the app
    return players.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });
  }

  async updatePlayerPoints(pseudo: string, points): Promise<void> {
    const player = await this.tournamentRepository.getPlayer(pseudo);
    if (!player) {
      throw new PlayerNotFoundException(pseudo);
    }
    return this.tournamentRepository.updatePlayerPoints({ pseudo, points });
  }
}
