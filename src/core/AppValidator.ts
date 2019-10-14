import { Request, Response, NextFunction } from "express";
import { isEmail, isLength } from 'validator';
import { VerifyErrors } from "jsonwebtoken";
import { AppSecurity } from "./AppSecurity";

export class AppValidator {

  public static sanitizeUserData(req: Request, res: Response, next: NextFunction) {
    if (req.body.name) req.body.name = req.body.name.trim();
    if (req.body.email) req.body.email = req.body.email.trim().toLowerCase();
    if (req.body.password) req.body.password = req.body.password.trim();
    next();
  }

  public static validateNewUserData(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    // required validation
    if (!name) return res.status(400).send({ message: 'The name is required' });
    if (!email) return res.status(400).send({ message: 'The email is required' });
    if (!password) return res.status(400).send({ message: 'The password is required' });

    // correct validation
    if (!isEmail(email)) return res.status(400).send({ message: 'Incorrect email' });

    // length validation
    if (!isLength(name, { min: 2, max: 30 })) {
      return res.status(400).send({ message: 'The name must be at least 2 and no more 30 characters long' });
    }
    if (!isLength(password, { min: 5, max: 30 })) {
      return res.status(400).send({ message: 'The password must be at least 6 and no more 30 characters long' });
    }
    next();
  }

  public static validateLoginUserData(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    // required validation
    if (!email) return res.status(400).send({ message: 'The email is required' });
    if (!password) return res.status(400).send({ message: 'The password is required' });

    // correct validation
    if (!isEmail(email)) return res.status(400).send({ message: 'Incorrect email' });
    next();
  }

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.header('token');

    const verificationCallback = (err: VerifyErrors, decode: any) => {
      if (decode) {
        req.id = decode.id;
        req.name = decode.name;
        next();
      } else {
        return res.status(401).send({ message: err.message });
      }
    };

    AppSecurity.verifyToken(token as string, verificationCallback);
  }

}
