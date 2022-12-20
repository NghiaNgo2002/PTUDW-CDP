const { connection } = require("../../../db");
const accountsRepository = require("./accountsRepository");


exports.getAll = () => {
    return accountsRepository.getAll();
};

exports.filter = (name) => {
    return accountsRepository.filter(name);
};

exports.getId = (id) => {
    return accountsRepository.getId(id);
};

exports.delete = (id) => {
    return accountsRepository.delete(id);
};

exports.saveEdit = (id) => {
    return accountsRepository.saveEdit(id);
};

exports.add = (account) => {
    return accountsRepository.add(account);
};

exports.nextId = () => {
    return accountsRepository.nextId();
}

exports.setLock = (id) => {
    return accountsRepository.setLockUnlock(id);
}

exports.setUnLock = (id) => {
    return accountsRepository.setLockUnlock(id);
}

exports.getSearch = (search) => {
    return accountsRepository.getSearch(search);
}

exports.getNameSorted = (sort) => {
    if(sort == 'asc')
        return accountsRepository.getNameAsc();
    return accountsRepository.getNameDesc();
}

exports.getAllActive = () => {
    return accountsRepository.getAllActive();
};