const orders_historyRepository = require("./orders_historyRepository");

exports.insertHistory = async (product) => {
  await orders_historyRepository.insertHistory(product);
};
