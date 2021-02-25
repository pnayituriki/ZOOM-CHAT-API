const { Client } = require('pg');
const config = require('./default.json');

const Pool = require('pg').Pool
const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port
});

module.exports = pool;