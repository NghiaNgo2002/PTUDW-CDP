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

exports.getPrice = (year) => {
    return statisticRepository.getPrice(year);
};

exports.getTopProducts = () => {
    return statisticRepository.getTopProducts();
};

exports.getYear = () => {
    return statisticRepository.getYear();
};

exports.getMonth = (month) => {
    return statisticRepository.getMonth(month);
};