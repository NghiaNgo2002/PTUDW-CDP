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

exports.save = async (id) => {
    const idNum = {UserId : id.UserId};
    const phonenumber = {PhoneNumber: id.PhoneNumber};
    const budget = {Budget: id.Budget};
    const isResetpass = {isRepass: id.isRepass};
    if(isResetpass) {
        const password = '1234';
    }
    await db.connection.execute('update accounts set ? id = ?', [id]);
    const temp = Object.values(agent);
    await db.connection.execute("UPDATE netcafe.accounts SET PHONENUMBER = ?, PASSWORD = ?, BUDGET = ? WHERE ID = ?;", [phonenumber, password, budget, idNum]);
    const result = await db.connection.execute("SELECT * FROM netcafe.accounts where PHONENUMBER like ?;", [phonenumber]);
    agent = result[0][0];
}