import { db } from "../index";
import { AppSecurity } from "../core/AppSecurity";
import { AppHttpError } from "../core/AppError";

export class User {

  public id: number | undefined;

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {
  }

  public async save(): Promise<User> | never {

    //user exist validation
    let queryResult = await db.connection.query(
      `select * from users where email = $1`,
      [this.email]
    );
    if (queryResult.rowCount) throw new AppHttpError('User with this email already exist', 409);


    this.password = await AppSecurity.generatePasswordHash(this.password);
    queryResult = await db.connection.query(
      `insert into users (name, email, password) values ($1, $2, $3) returning *`,
      [this.name, this.email, this.password]
    );
    return queryResult.rows[0];


  }
}
