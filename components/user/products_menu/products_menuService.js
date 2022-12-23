const { connection } = require("../../../db");
const products_menuRepository = require("./products_menuRepository");

exports.getAll = () => {
  return products_menuRepository.getAll();
};

exports.count = (name) => {
  return products_menuRepository.count(name);
};

exports.getLimit = (limit, offset, name) => {
  return products_menuRepository.getLimit(limit, offset, name);
};

exports.getCategory = (category) => {
  return products_menuRepository.getCategory(category);
};

exports.filter = (name) => {
  return products_menuRepository.filter(name);
};
