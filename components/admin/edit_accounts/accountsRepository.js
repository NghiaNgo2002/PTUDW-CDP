const db = require('../../../db');

exports.getAll = async () => {
    const result =  await db.connection.execute('select * from accounts');
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

exports.delete = async (id) => {
    await db.connection.execute('delete * from accounts where id = ?', [id]);
}

exports.delete = async (id) => {
    await db.connection.execute('delete * from accounts where id = ?', [id]);
}

exports.save = async (id) => {
    await db.connection.execute('update accounts set ? id = ?', [id]);
}