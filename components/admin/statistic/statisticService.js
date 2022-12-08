const accountsRepository = require("./accountsRepository");

exports.getAll = (category) => {
    return accountsRepository.getAll(category);
};

exports.filter = (name) => {
    return accountsRepository.filter(name);
};

exports.getId = (id) => {
    return accountsRepository.getId(id);
};
