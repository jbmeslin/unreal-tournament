import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TournamentsService } from '../../../application/ports/input-driving/tournaments.service';
import { Player } from '../../../domain/models/Player';
import { CreatePlayerRequest } from './dto/CreatePlayerRequest';
import { UpdatePlayerPointsRequest } from './dto/UpdatePlayerPointsRequest';
import { PlayerAlreadyExistException } from '../../../domain/exceptions/PlayerAlreadyExistException';
import { PlayerNotFoundException } from '../../../domain/exceptions/PlayerNotFoundException';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly service: TournamentsService) {}

  @Get('/players/:pseudo')
  async getPlayer(@Param('pseudo') pseudo: string): Promise<Player> {
    return this.service.getPlayerInfo(pseudo).catch((error) => {
      if (error instanceof PlayerNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException();
    });
  }

  @Get('/players')
  async getPlayers(): Promise<Player[]> {
    return await this.service.getPlayers();
  }

  @Post('/players')
  async addPlayer(@Body() player: CreatePlayerRequest): Promise<Player> {
    return this.service.addPlayer(player.pseudo).catch((error) => {
      if (error instanceof PlayerAlreadyExistException) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException();
    });
  }

  @Put('/players/:pseudo/updatePoints')
  async updatePlayerPoints(
    @Param('pseudo') pseudo: string,
    @Body() bodyRequest: UpdatePlayerPointsRequest,
  ): Promise<void> {
    return this.service
      .updatePlayerPoints(pseudo, bodyRequest.points)
      .catch((error) => {
        if (error instanceof PlayerNotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw new BadRequestException();
      });
  }

  @Delete('/players')
  async deletePlayers(): Promise<void> {
    return this.service.deletePlayers();
  }
}
