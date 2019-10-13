import { NextFunction, Request, Response } from 'express';
import { User } from "../models";

export class AuthController {

  public static async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const user = new User(name, email, password);

    try {
      const operationResult = await user.save();
      res.send(operationResult);
    } catch (error) {
      next(error)
    }

  }

  public static hello(req: Request, res: Response, next: NextFunction) {
    res.send('Routes work!')
  }

}
