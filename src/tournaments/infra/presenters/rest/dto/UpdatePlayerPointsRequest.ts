import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlayerPointsRequest {
  @IsNumber()
  @IsNotEmpty()
  points: number;
}
