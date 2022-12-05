const { connection } = require("../../../db");
const productsRepository = require("./productsRepository");

exports.get = (id) => productsRepository.get(id);
