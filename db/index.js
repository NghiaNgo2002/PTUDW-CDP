const mysql = require("mysql2/promise");
const util = require("util");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "mysql-101628-0.cloudclusters.net",
    port: 10024,
    user: "admin",
    password: "34eMcl8t",
    database: "netcafe",
  });
  console.log("Database connected!");
})();

module.exports = db;
