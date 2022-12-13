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


exports.delete = async (account) => {
    var obj = Object.values(account);
    await db.connection.execute('delete from accounts where id = ?', [obj[0]]);
}

exports.saveEdit = async (id) => {
    var obj = Object.values(id);
    
    if(obj[4]) {
        const password = '1234';
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, PASSWORD = ?, BUDGET = ? WHERE ID = ?;", [obj[1], password, obj[2], obj[0]]);
    }
    else{
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, BUDGET = ? WHERE ID = ?;", [obj[1], obj[2], obj[0]]);
    }
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [obj[1]]);
    return result[0][0];
}

exports.nextId = async () => {
    let maxId = "MAX(ID) + 1";
    const result = await db.connection.execute("SELECT ? FROM accounts", [maxId]);
    var obj = Object.values(result);
    var id = obj[0].length + 1;
    return id;
}
exports.add = async (account) => {
    var obj = Object.values(account);
    var tmp = obj[4].split("-");
    console.log(tmp);
    obj[4] = tmp[2] + "-" + tmp[1] + "-" + tmp[0];

    const result =  await db.connection.execute('insert into accounts set ID = ?, PHONENUMBER = ?, PASSWORD = ?, FULLNAME = ?, CREATEDDATE = ?, LEVEL = ?, IMAGE = ?, BUDGET = ?, ACTIVE = ?',
                                                                            [obj[0], obj[1], obj[2], obj[3], obj[4], obj[5], 'null', obj[6], 1]);

    return result[0];
}

exports.setLockUnlock = async (id) => {
    var obj = Object.values(id);
    await db.connection.execute("UPDATE accounts SET ACTIVE = ? where ID = ?;", [obj[4], obj[0]]);
}