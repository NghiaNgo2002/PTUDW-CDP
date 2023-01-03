const orders_historyRepository = require("./orders_historyRepository");

exports.insertHistoryFood = async (product, user, note) => {
  await orders_historyRepository.insertHistory(product, user, note);
};

exports.insertHistory = async (userID, price) => {
  await orders_historyRepository.insertHistory(userID, price);
};
