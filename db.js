const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "V1257pzk48k",
    host: "localhost",
    port: 5432,
    database: "pastebindatabase"
});

module.exports = pool;

