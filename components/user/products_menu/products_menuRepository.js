const db = require("../../../db");

exports.getAll = async () => {
  const result = await db.connection.execute("select * from menu");
  return result[0];
};

exports.filter = async (name) => {
  const result = await db.connection.execute(
    "select * from menu where name like ?",
    [`%${name}%`]
  );
  return result[0];
};
