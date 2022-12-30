const db = require('../../../db');

exports.getAll = async () => {
    const result =  await db.connection.execute('select * from history');
    return result[0];
}

exports.filter = async (name) => {
    const result =  await db.connection.execute("select * from history where name like ?", [`%${name}%`]);
    return result[0];
}

exports.getId = async (id) => {
    const result =  await db.connection.execute('select * from history where id = ?', [id]);
    return result[0][0];
}


exports.delete = async (id) => {
    await db.connection.execute('delete * from history where id = ?', [id]);
}

exports.saveEdit = async (id) => {
    var obj = Object.values(id);
    console.log(obj);
    const result = await db.connection.execute("UPDATE history SET NAME = ?, IMAGE = ?, PRICE = ?, CATEGORY = ? where ID = ?;", [obj[1],`history-item-${obj[0]}.jpg`, obj[2], obj[3],obj[0]]);
    return result[0][0];
}

exports.nextId = async () => {
    const result = await db.connection.execute("SELECT MAX(ID) + 1 FROM history");
    var obj = Object.values(result);

    return obj[0];
}
exports.add = async (account, nextId) => {
    var obj = Object.values(account);
    var id = Object.values(nextId);
    const result =  await db.connection.execute('insert into history set ID = ?, name = ?, PASSWORD = ?, FULLNAME = ?, LEVEL = ?, IMAGE = ?, BUDGET = ?, ACTIVE = ?', [id[0], obj[0], obj[1], obj[2], 'waiting', obj[3], obj[4], 1]);
    //const result =  await db.connection.execute("insert into history set ?", [account]);
    return result[0];
}

exports.getAllCategory = async () => {
    const result = await db.connection.execute('select distinct category from history ');
    return result[0];
}

exports.getCategory = async (category) => {
    const result = await db.connection.execute('select * from history where category = ?', [category]);
    return result[0];
}

exports.getSearch = async (search) => {
    const result = await db.connection.execute("select * from history  where name like ?", [`%${search}%`]);
    return result[0];
}

exports.getNameAsc = async () => {
    const result = await db.connection.execute("select * from history ORDER BY name ASC");
    console.log(result[0]);
    return result[0];
}

exports.getNameDesc = async () => {
    const result = await db.connection.execute("select * from history ORDER BY name DESC");
    console.log(result[0]);
    return result[0];
}