
const productsRepository = require("./edit_productsRepository");

exports.getAll = (category) => {
    return productsRepository.getAll(category);
};

exports.filter = (name) => {
    return productsRepository.filter(name);
};

exports.getId = (id) => {
    return productsRepository.getId(id);
};

exports.delete = (id) => {
    return productsRepository.delete(id);
};

exports.saveEdit = (id) => {
    return productsRepository.saveEdit(id);
};

exports.add = (account) => {
    return productsRepository.add(account);
};

exports.nextId = () => {
    return productsRepository.nextId();
}

