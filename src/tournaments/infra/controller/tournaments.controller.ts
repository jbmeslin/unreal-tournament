import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TournamentsService } from '../../application/tournaments.service';
import { Player } from '../../domain/models/Player';
import { CreatePlayerRequest } from './dto/CreatePlayerRequest';
import { UpdatePlayerPointsRequest } from './dto/UpdatePlayerPointsRequest';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly service: TournamentsService) {}

  @Get('/players/:pseudo')
  async getPlayer(@Param('pseudo') pseudo: string): Promise<Player> {
    return this.service.getPlayerInfo(pseudo);
  }

  @Get('/players')
  async getPlayers(): Promise<Player[]> {
    return await this.service.getPlayers();
  }

  @Post('/players')
  async addPlayer(@Body() player: CreatePlayerRequest): Promise<Player> {
    return this.service.addPlayer(player.pseudo);
  }

  @Post('/players/updatePoints')
  async updatePlayerPoints(
    @Body() player: UpdatePlayerPointsRequest,
  ): Promise<void> {
    return this.service.updatePlayerPoints(player.pseudo, player.points);
  }

  @Delete('/players')
  async deletePlayers(): Promise<void> {
    return this.service.deletePlayers();
  }
}
