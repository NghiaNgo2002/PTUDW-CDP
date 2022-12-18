const { connection } = require("../../../db");
const products_menuRepository = require("./products_menuRepository");

exports.getAll = () => {
  return products_menuRepository.getAll();
};

exports.getLimit = (products, first, last) => {
  return products_menuRepository.getLimit(products, first, last);
};

exports.getCategory = (category) => {
  return products_menuRepository.getCategory(category);
};

exports.filter = (name) => {
  return products_menuRepository.filter(name);
};
