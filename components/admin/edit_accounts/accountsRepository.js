const db = require('../../../db');

exports.getAll = async () => {
    const result =  await db.connection.execute('select * from accounts');
    return result[0];
}

exports.filter = async (name) => {
    const result =  await db.connection.execute("select * from accounts where phonenumber like ?", [`%${name}%`]);
    return result[0];
}

exports.getId = async (id) => {
    const result =  await db.connection.execute('select * from accounts where id = ?', [id]);
    return result[0][0];
}


exports.delete = async (id) => {
    await db.connection.execute('delete * from accounts where id = ?', [id]);
}

exports.saveEdit = async (id) => {
    var obj = Object.values(id);
    const isResetpass = {isRepass: id.isRepass};
    console.log(obj);
    console.log(isResetpass);
    if(obj[4]) {
        const password = '1234';
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, PASSWORD = ?, BUDGET = ? WHERE ID = ?;", [obj[1], password, obj[2], obj[0]]);
    }
    else{
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, BUDGET = ? WHERE ID = ?;", [obj[1], obj[2], obj[0]]);
    }
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [obj[1]]);
    agent = result[0][0];
}

exports.add = async (account) => {
    var obj = Object.values(account);
    console.log(account);
    const result =  await db.connection.execute('insert into accounts set ID = ?, PHONENUMBER = ?, PASSWORD = ?, FULLNAME = ?, LEVEL = ?, IMAGE = ?, BUDGET = ?, ACTIVE = ?', ['9', obj[0], obj[1], obj[2], 'waiting', obj[3], obj[4], 1]);
    //const result =  await db.connection.execute("insert into accounts set ?", [account]);
    return result[0];
}
