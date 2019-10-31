declare module 'express-serve-static-core' {

  interface Request {
    id?: number;
    name?: string;
  }

  interface Response {
    id?: number;
    name?: string;
  }

}

export interface iToken {
  id: string;
  expire: number;
}

export interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export class AppHttpError extends Error {

  constructor(message: string, public statusCode: number) {
    super(message);
  }

}
