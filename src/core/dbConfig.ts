import { PoolConfig } from 'pg';
import { get as getConfig } from 'config';
import { DBConfig } from "./AppTypes";

const config: DBConfig = getConfig('db');

export const dbConfig: PoolConfig = {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
  min: 2,
  max: 10,
  connectionTimeoutMillis: 5000
};
