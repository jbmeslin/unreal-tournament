import { ITournamentRepository } from '../../../application/ports/output-driven/ITournament.repository';
import { Player } from '../../../domain/models/Player';

export const DEFAULT_STACK = 500;

export class InMemoryRepository implements ITournamentRepository {
  private players: Player[] = [];

  addPlayer(pseudo: string): Promise<Player> {
    let player = new Player(pseudo, DEFAULT_STACK);
    this.players.push(player);
    return Promise.resolve(player);
  }

  deletePlayers(): Promise<void> {
    this.players = [];
    return Promise.resolve(undefined);
  }

  getPlayerInfo(pseudo: string): Promise<Player> {
    let player = this.players.filter((p) => p.pseudo === pseudo).pop();
    return Promise.resolve(player);
  }

  getPlayers(): Promise<Player[]> {
    return Promise.resolve(this.players);
  }

  updatePlayerPoints(player: Player): Promise<void> {
    this.players = this.players.map((p) => {
      if (p.pseudo === player.pseudo) {
        return { ...p, points: player.points };
      }
      return p;
    });
    return Promise.resolve(undefined);
  }
}
