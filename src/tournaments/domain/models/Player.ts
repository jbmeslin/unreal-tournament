export class Player {
  constructor(public readonly pseudo: string, points: number) {
    this.points = points;
  }
  public points: number;
}

export class PlayerInfo extends Player {
  constructor(
    public readonly pseudo: string,
    public readonly points: number,
    public readonly position,
  ) {
    super(pseudo, position);
    this.position = points;
  }
}
