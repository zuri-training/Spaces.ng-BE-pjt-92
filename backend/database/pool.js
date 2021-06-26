const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const databaseConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
} : 'postgres://xdefranu:d3pl87MNyM3HD52FCNT-wtQLlgiTpSXD@batyr.db.elephantsql.com/xdefranu';

/* const client = new Client(process.env.DATABASE_URL); */
const pool = new Pool(databaseConfig);

module.exports = pool;