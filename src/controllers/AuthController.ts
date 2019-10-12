import { NextFunction, Request, Response } from 'express';
import { User } from "../models";

export class AuthController {

  public static signUp(req: Request, res: Response, next: NextFunction) {
    res.send({ k: 1 });
  }

  public static hello(req: Request, res: Response, next: NextFunction) {
    res.send('Routes work!')
  }

}