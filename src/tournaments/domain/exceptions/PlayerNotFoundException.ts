export class PlayerNotFoundException extends Error {
  constructor(pseudo) {
    super(`Player: ${pseudo} not found`);
    this.name = this.constructor.name;
  }
}
