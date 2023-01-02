const db = require("../../../db/index");

exports.insertHistory = async (product) => {
  let today = new Date().toISOString().slice(0, 10);
  await db.connection.execute(
    "insert into history_food (`NAME`, `COUNT`, `PRICE`, `TIME`) VALUES (?,?,?,?)",
    [product.name, product.quantity, product.price, today]
  );
};
