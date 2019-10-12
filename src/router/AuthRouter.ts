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
      '/',
      AppValidator.sanitizeUserData,
      AppValidator.validateNewUserData,
      AuthController.signUp
    );
    return this._router;
  }

}