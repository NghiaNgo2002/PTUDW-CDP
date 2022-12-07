const mysql = require("mysql2/promise");
const util = require("util");

const db = { connection: null };

(async () => {
  db.connection = await mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_ababa",
    password: "wA8&94c!m7eNGa?",
    database: "freedb_NetCafe",
  });
  console.log("Database connected!");
})();


module.exports = db;
