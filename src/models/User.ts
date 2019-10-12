export class User {

  public id: number | undefined;

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {
  }
}