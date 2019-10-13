import { NextFunction, Request, Response } from 'express';
import { User } from "../models";

export class AuthController {

  public static async signUp(req: Request, res: Response, next: NextFunction) {
    const user = new User('Roman', 'zuevrg@yandex.ru', 'a483233ce');
    await user.save();
    res.send({ k: 1 });
  }

  public static hello(req: Request, res: Response, next: NextFunction) {
    res.send('Routes work!')
  }

}