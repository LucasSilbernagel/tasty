import path from 'path'
import { parse } from 'pg-connection-string'

const developmentConfig = {
  client: 'sqlite',
  connection: {
    filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
  },
  useNullAsDefault: true,
}

const productionConfig = {
  client: 'postgres',
  connection: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false },
    ...parse(process.env.DATABASE_URL || ''),
  },
  pool: {
    min: 0,
    max: 10,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  },
}

export default ({ env }) => ({
  connection: {
    development: developmentConfig,
    production: productionConfig,
  }[env('NODE_ENV', 'development')],
})
