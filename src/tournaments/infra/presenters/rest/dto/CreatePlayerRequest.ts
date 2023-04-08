import { IsNotEmpty } from 'class-validator';

export class CreatePlayerRequest {
  @IsNotEmpty()
  pseudo: string;
}
