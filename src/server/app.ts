import express, { Application, Request, Response, NextFunction } from 'express';
import Router from '../router';
import logger from 'morgan';

export class AppServer {

  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initApi();
  }

  initMiddleware(): void {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  initApi(): void {
    this.app.use('/api/v1', Router.routes);
    this.app.use(this.logErrors);
    this.app.use(this.errorHandler);
  }

  private logErrors(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    next(err);
  }

  private errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    res.status(500);
    res.send({ error: err });
  }

}
