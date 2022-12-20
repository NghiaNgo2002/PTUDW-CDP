const db = require('../../../db');

exports.getAll = async () => {
    const result =  await db.connection.execute('select * from menu');
    return result[0];
}

exports.filter = async (name) => {
    const result =  await db.connection.execute("select * from menu where name like ?", [`%${name}%`]);
    return result[0];
}

exports.getId = async (id) => {
    const result =  await db.connection.execute('select * from menu where id = ?', [id]);
    return result[0][0];
}


exports.delete = async (id) => {
    await db.connection.execute('delete * from menu where id = ?', [id]);
}

exports.saveEdit = async (id) => {
    var obj = Object.values(id);
    const result = await db.connection.execute("UPDATE menu SET NAME = ?, IMAGE = ?, PRICE = ? where id = ?;", [obj[1],obj[2],obj[3],obj[0]]);
    return result[0][0];
}

exports.nextId = async () => {
    const result = await db.connection.execute("SELECT MAX(ID) + 1 FROM menu");
    var obj = Object.values(result);

    return obj[0];
}
exports.add = async (account, nextId) => {
    var obj = Object.values(account);
    var id = Object.values(nextId);
    const result =  await db.connection.execute('insert into menu set ID = ?, name = ?, PASSWORD = ?, FULLNAME = ?, LEVEL = ?, IMAGE = ?, BUDGET = ?, ACTIVE = ?', [id[0], obj[0], obj[1], obj[2], 'waiting', obj[3], obj[4], 1]);
    //const result =  await db.connection.execute("insert into menu set ?", [account]);
    return result[0];
}

exports.getAllCategory = async () => {
    const result = await db.connection.execute('select distinct category from menu ');
    return result[0];
}

exports.getCategory = async (category) => {
    const result = await db.connection.execute('select * from menu where category = ?', [category]);
    return result[0];
}

exports.getSearch = async (search) => {
    const result = await db.connection.execute("select * from menu  where name like ?", [`%${search}%`]);
    return result[0];
}

exports.getNameAsc = async () => {
    const result = await db.connection.execute("select * from menu ORDER BY name ASC");
    console.log(result[0]);
    return result[0];
}

exports.getNameDesc = async () => {
    const result = await db.connection.execute("select * from menu ORDER BY name DESC");
    console.log(result[0]);
    return result[0];
}