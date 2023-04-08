export class PlayerAlreadyExistException extends Error {
  constructor(pseudo) {
    super(`Pseudo: ${pseudo} already exist`);
    this.name = this.constructor.name;
  }
}
