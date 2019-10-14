import { db } from "../index";
import { AppSecurity } from "../core/AppSecurity";
import { AppHttpError } from "../core/AppTypes";

export class User {

  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: number
  ) {
  }

  public static async findByEmail(email: string): Promise<User| undefined> {
    const result = await db.connection.query(
      `select * from users where email = $1`,
      [email]
    );
    if (result.rows.length) {
      const { id, name, email, password } = result.rows[0];
      return new this(name, email, password, id);
    }
  }

  public async save(): Promise<User> | never {

    // email exist validate
    const queryUser = await User.findByEmail(this.email);
    if (queryUser) throw new AppHttpError('User with this email already exist', 409);

    // create new cortege
    this.password = await AppSecurity.generatePasswordHash(this.password);
    const queryResult = await db.connection.query(
      `insert into users (name, email, password) values ($1, $2, $3) returning *`,
      [this.name, this.email, this.password]
    );
    return queryResult.rows[0];
  }

  public async validatePassword(password: string) {
    return await AppSecurity.validatePassword(password, this.password);
  }

}
