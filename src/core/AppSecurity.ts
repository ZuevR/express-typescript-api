import { hash, compare } from 'bcrypt';
import { sign, verify, VerifyCallback } from 'jsonwebtoken';
import { User } from "../models";
import { iToken } from "./AppTypes";

export class AppSecurity {

  public static async generatePasswordHash(password: string): Promise<string> {
    return await hash(password, process.env.SALT_LEVEL || 3);
  }

  public static async validatePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  public static generateToken(user: User, hours: number): iToken {
    const exp = Math.floor(Date.now() / 1000 + (3600 * hours));
    return {
      id: sign({ exp, id: user.id, name: user.name }, 'h42Hq9lgCs'),
      expire: exp
    };
  }

  public static verifyToken(token: string, callback: VerifyCallback) {
    return verify(token, 'h42Hq9lgCs', callback);
  }

}
