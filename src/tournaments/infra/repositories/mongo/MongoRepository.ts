import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITournamentRepository } from '../../../application/ports/output-driven/ITournament.repository';
import { Player } from '../../../domain/models/Player';
import { PlayerDocument } from './schemas/tournamentsSchema';
import { map } from 'rxjs';

const mapToDomain = (source: PlayerDocument): Player => {
  return {
    pseudo: source.pseudo,
    points: source.points,
  };
};

@Injectable()
export class MongoRepository implements ITournamentRepository {
  constructor(
    @Inject('TOURNAMENT_MODEL')
    private readonly model: Model<PlayerDocument>,
  ) {}

  //TODO add test

  async addPlayer(pseudo: string, points: number): Promise<Player> {
    const playerDoc = await this.model.create({ pseudo, points });
    return mapToDomain(playerDoc);
  }

  async deletePlayers(): Promise<void> {
    const query = await this.model.deleteMany();
    return Promise.resolve(undefined);
  }

  async getPlayer(pseudo: string): Promise<Player> {
    let playerDoc = await this.model.findOne({ pseudo }).exec();
    if (!playerDoc) {
      return;
    }
    return mapToDomain(playerDoc);
  }

  async getPlayers(): Promise<Player[]> {
    let playersDoc = await this.model.find().exec();
    return playersDoc.map((p) => mapToDomain(p));
  }

  async updatePlayerPoints(player: Player): Promise<void> {
    let playerDoc = await this.model.findOneAndUpdate(
      { pseudo: player.pseudo },
      { $set: { points: player.points } },
    );
    return Promise.resolve(undefined);
  }
}
