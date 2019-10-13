import { PoolConfig } from "pg";

export const dbConfig: PoolConfig = {
  host: '127.0.0.1',
  port: 5432,
  database: 'node_ts_backend',
  user: 'postgres',
  password: 'a483233ce',
  min: 2,
  max: 10,
  connectionTimeoutMillis: 5000
};