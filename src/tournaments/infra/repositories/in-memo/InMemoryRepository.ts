import { ITournamentRepository } from '../../../application/ports/output-driven/ITournament.repository';
import { Player } from '../../../domain/models/Player';
import { Tournament } from '../../../domain/models/Tournament';

export class InMemoryRepository implements ITournamentRepository {
  // private players: Player[] = [];
  private tournament: Tournament = new Tournament();

  addPlayer(pseudo: string, points: number): Promise<Player> {
    let player = { pseudo, points } as Player;
    this.tournament.players.push(player);
    return Promise.resolve(player);
  }

  deletePlayers(): Promise<void> {
    this.tournament.players = [];
    return Promise.resolve(undefined);
  }

  getPlayer(pseudo: string): Promise<Player> {
    let player = this.tournament.players
      .filter((p) => p.pseudo === pseudo)
      .pop();
    return Promise.resolve(player);
  }

  getPlayers(): Promise<Player[]> {
    return Promise.resolve(this.tournament.players);
  }

  updatePlayerPoints(player: Player): Promise<void> {
    this.tournament.players = this.tournament.players.map((p) => {
      if (p.pseudo === player.pseudo) {
        return { ...p, points: player.points };
      }
      return p;
    });
    return Promise.resolve(undefined);
  }
}
