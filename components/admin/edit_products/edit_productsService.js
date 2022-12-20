const productsRepository = require("./edit_productsRepository");

exports.getAll = () => {
    return productsRepository.getAll();
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


exports.getAllCategory = () => {
    return productsRepository.getAllCategory();
}

exports.getCategory = (category) => {
    return productsRepository.getCategory(category);
}

exports.getSearch = (category) => {
    return productsRepository.getSearch(category);
}

exports.getNameSorted = (sort) => {
    if(sort == 'asc')
        return productsRepository.getNameAsc();
    return productsRepository.getNameDesc();
}