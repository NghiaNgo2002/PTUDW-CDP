const mysql = require("mysql2/promise");
const util = require("util");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "chien401",
    database: "netcafe",
  });
  console.log("Database connected!");
})();


module.exports = db;
