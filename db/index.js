const mysql = require("mysql2/promise");
const util = require("util");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-103011-0.cloudclusters.net",
    port: 10180,
    user: "admin",
    password: "dcDfRcvT",
    database: "netcafe",
  });
  console.log("Database connected!");
})();

module.exports = db;
