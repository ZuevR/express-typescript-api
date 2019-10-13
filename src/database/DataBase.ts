import { Pool, PoolConfig } from 'pg';

export class DataBase {

  public connection: Pool;

  constructor(config: PoolConfig) {
    this.connection = new Pool(config);
  }
}