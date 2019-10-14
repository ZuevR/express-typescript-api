import { Router } from 'express';
import { AuthController } from '../controllers';
import { AppValidator } from "../core/AppValidator";

export class AuthRouter {

  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  public get routes() {

    this._router.post(
      '/sign-up',
      AppValidator.sanitizeUserData,
      AppValidator.validateNewUserData,
      AuthController.signUp
    );

    this._router.post(
      '/sign-in',
      AppValidator.sanitizeUserData,
      AppValidator.validateLoginUserData,
      AuthController.signIn
    );

    return this._router;
  }

}
