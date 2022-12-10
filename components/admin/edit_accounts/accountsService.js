const { connection } = require("../../../db");
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