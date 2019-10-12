import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {

  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  public get routes() {
    this._router.get('/me', AuthController.hello);
    return this._router;
  }

}