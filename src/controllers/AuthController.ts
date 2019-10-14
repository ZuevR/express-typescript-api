import { NextFunction, Request, Response } from 'express';
import { User } from "../models";
import { AppSecurity } from "../core/AppSecurity";

export class AuthController {

  public static async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const user = new User(name, email, password);

    try {
      const operationResult = await user.save();
      res.status(201).send(operationResult);
    } catch (error) {
      next(error)
    }
  }

  public static async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (!user) return res.status(404).send({ message: 'User with this email doesn\'t exist' });
      if (!await user.validatePassword(password)) return res.status(403).send({ message: 'Wrong password' });
      return res.status(200).send(AppSecurity.generateToken(user, 24));
    } catch (error) {
      next(error);
    }
  }

}
