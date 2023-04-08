export interface Player {
  readonly pseudo: string;
  readonly points: number;
}

export class PlayerInfo implements Player {
  constructor(
    public readonly pseudo: string,
    public readonly points: number,
    public readonly position,
  ) {}
}
