import { db } from "../index";

export class User {

  public id: number | undefined;

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {
  }

  public save() {
    return db.connection.query('Select NOW()').then(r => console.log(r));
  }
}