const db = require('../../../db');

exports.getAll = async () => {
    const result =  await db.connection.execute('select * from history');
    return result[0];
}

exports.filter = async (name) => {
    const result =  await db.connection.execute("select * from accounts where name like ?", [`%${name}%`]);
    return result[0];
}

exports.getId = async (id) => {
    const result =  await db.connection.execute('select * from accounts where id = ?', [id]);
    return result[0][0];
}

exports.getPrice = async () => {
    const result =  await db.connection.execute('select PRICE from history');
    return result[0];
}