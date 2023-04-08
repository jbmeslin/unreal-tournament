import { Player } from '../../../domain/models/Player';

export interface ITournamentRepository {
  addPlayer(pseudo: string): Promise<Player>;
  updatePlayerPoints(player: Player): Promise<void>;
  getPlayerInfo(pseudo: string): Promise<Player>;
  getPlayers(): Promise<Player[]>;
  deletePlayers(): Promise<void>;
}
