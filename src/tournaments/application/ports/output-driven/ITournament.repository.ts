import { Player } from '../../../domain/models/Player';

export interface ITournamentRepository {
  addPlayer(pseudo: string, points: number): Promise<Player>;
  updatePlayerPoints(player: Player): Promise<void>;
  getPlayer(pseudo: string): Promise<Player>;
  getPlayers(): Promise<Player[]>;
  deletePlayers(): Promise<void>;
}
