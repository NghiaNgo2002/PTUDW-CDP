const { connection } = require("../../../db");
const products_menuRepository = require("./products_menuRepository");

exports.getAll = (category) => {
  return products_menuRepository.getAll();
};

exports.getCategory = (category) => {
  return products_menuRepository.getCategory(category);
};

exports.filter = (name) => {
  return products_menuRepository.filter(name);
};

exports.sort = (type) => {
  return products_menuRepository.sort(type);
};
