const db = require("../../../db");

exports.getAll = async () => {
  const result = await db.connection.execute("SELECT * FROM menu");
  return result[0];
};

exports.getLimit = async (products, first, last) => {
  first = first < last ? first : last;
  return products.slice(first, last + 1);
};

exports.getCategory = async (category) => {
  const result = await db.connection.execute(
    "SELECT * FROM menu where CATEGORY like ?",
    [category]
  );
  return result[0];
};

exports.filter = async (name) => {
  const result = await db.connection.execute(
    "select * from menu where name like ? or category like ?",
    [`%${name}%`, `%${name}%`]
  );
  return result[0];
};
