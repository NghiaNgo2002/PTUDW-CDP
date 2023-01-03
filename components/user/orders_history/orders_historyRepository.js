const db = require("../../../db/index");

exports.insertHistoryFood = async (product, user, note) => {
  let today = new Date().toISOString().slice(0, 10);
  await db.connection.execute(
    "insert into history_food (`NAME`, `COUNT`, `PRICE`, `TIME`,`USER_ID`,`NOTE`) VALUES (?,?,?,?,?,?)",
    [product.name, product.quantity, product.price, today, user.ID, note]
  );
};

exports.insertHistory = async (userID, price) => {
  let today = new Date().toISOString().slice(0, 10);
  await db.connection.execute(
    "insert into history (`IDUSER`, `PRICE`,`TIME`, `STATUS`) VALUES (?,?,?,?)",
    [userID, price, today, "Waiting"]
  );
};
