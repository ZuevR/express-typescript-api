import { NextFunction, Request, Response } from 'express';

export class AuthController {

  public static hello(req: Request, res: Response, next: NextFunction) {
    res.send('Routes work!')
  }

}