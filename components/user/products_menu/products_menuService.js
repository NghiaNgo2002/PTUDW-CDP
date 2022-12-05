const { connection } = require("../../../db");
const products_menuRepository = require("./products_menuRepository");

exports.getAll = () => {
  return products_menuRepository.getAll();
};

exports.filter = (name) => {
  return products_menuRepository.filter(name);
};
