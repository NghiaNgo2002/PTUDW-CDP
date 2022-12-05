const db = require("../../../db");

exports.get = async (id) => {
  const result = await db.connection.execute(
    "select * from menu where id = ?",
    [id]
  );
  return result[0][0];
};
