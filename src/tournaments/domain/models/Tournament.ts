import { Player } from './Player';

export class Tournament {
  constructor() {
    this.players = [];
  }
  players: Player[];
}

export const DEFAULT_STACK = 25000;
