import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TournamentsService } from '../application/tournaments.service';
import { Player } from '../domain/models/Player';

class createPlayerDTO {
  pseudo: string;
}

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
  async addPlayer(@Body() player: createPlayerDTO): Promise<Player> {
    return this.service.addPlayer(player.pseudo);
  }
}
