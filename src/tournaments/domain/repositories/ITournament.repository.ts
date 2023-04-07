import { Player } from '../models/Player';

export interface ITournamentRepository {
  addPlayer(pseudo: string): Promise<Player>;
  updatePlayerPoints(pseudo: string, points): Promise<void>;
  getPlayerInfo(pseudo: string): Promise<Player>;
  getPlayers(): Promise<Player[]>;
  deletePlayers(): Promise<void>;
}
