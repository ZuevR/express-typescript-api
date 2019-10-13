import { hash } from 'bcrypt';

export class AppSecurity {

  public static async generatePasswordHash(password: string): Promise<string> {
    return await hash(password, process.env.SALT_LEVEL || 3);
  }

}
