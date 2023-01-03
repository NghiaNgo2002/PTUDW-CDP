const db = require("../../../db");

exports.get = async (id) => {
  const result = await db.connection.execute(
    "select * from menu where id = ?",
    [id]
  );
  return result[0][0];
};

exports.getReviewList = async (productID, limit, offset) => {
  const result = await db.connection.execute(
    "SELECT * FROM review where IDPRODUCT like ? limit " +
      limit +
      " offset " +
      offset,
    [productID]
  );
  return result[0];
};

exports.countReviewList = async (productId) => {
  let result;
  result = await db.connection.execute(
    "select count(*) from review where IDPRODUCT like ?",
    [`%${productId}%`]
  );

  return result[0][0]["count(*)"];
};
