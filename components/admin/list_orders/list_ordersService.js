const ordersRepository = require("./list_ordersRepository");

exports.getAll = () => {
    return ordersRepository.getAll();
};

exports.filter = (name) => {
    return ordersRepository.filter(name);
};

exports.getId = (id) => {
    return ordersRepository.getId(id);
};

exports.delete = (id) => {
    return ordersRepository.delete(id);
};

exports.saveEdit = (id) => {
    return ordersRepository.saveEdit(id);
};

exports.add = (account) => {
    return ordersRepository.add(account);
};

exports.nextId = () => {
    return ordersRepository.nextId();
}


exports.getAllCategory = () => {
    return ordersRepository.getAllCategory();
}

exports.getCategory = (category) => {
    return ordersRepository.getCategory(category);
}

exports.getSearch = (category) => {
    return ordersRepository.getSearch(category);
}

exports.getNameSorted = (sort) => {
    if(sort == 'asc')
        return ordersRepository.getNameAsc();
    return ordersRepository.getNameDesc();
}