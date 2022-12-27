const statisticRepository = require("./statisticRepository");

exports.getAll = () => {
    return statisticRepository.getAll();
};

exports.filter = (name) => {
    return statisticRepository.filter(name);
};

exports.getId = (id) => {
    return statisticRepository.getId(id);
};

exports.getPrice = () => {
    return statisticRepository.getPrice();
};
exports.getTopProducts = () => {
    return statisticRepository.getTopProducts();
};