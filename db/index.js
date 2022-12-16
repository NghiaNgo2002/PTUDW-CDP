const mysql = require("mysql2/promise");
const util = require("util");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "db4free.net",
    user: "adminxcdp",
    password: "12345678",
    database: "netcafexcdp",
  });
  console.log("Database connected!");
})();


module.exports = db;
