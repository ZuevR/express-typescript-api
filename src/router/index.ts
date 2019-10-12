import { Router as ExpressRouter } from 'express';
import { AuthRouter } from './AuthRouter';

export default class Router {

  private static router: ExpressRouter = ExpressRouter();

  private static routeList = [
    { path: '/auth', router: AuthRouter }
  ];

  public static get routes(): ExpressRouter {
    this.routeList.forEach(item => {
      this.router.use(
        item.path,
        new item.router().routes
      );
    });
    return this.router;
  }
}