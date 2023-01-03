const { connection } = require("../../../db");
const productsRepository = require("./productsRepository");

exports.get = (id) => productsRepository.get(id);

exports.getReviewList = (productID, limit, offset) => {
  return productsRepository.getReviewList(productID, limit, offset);
};

exports.countReviewList = (productID) => {
  return productsRepository.countReviewList(productID);
};
