const db = require('../../../db');
const bcrypt = require("bcryptjs");

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
    
    if(obj[6]) {
        var password = '123456';
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, PASSWORD = ?, FULLNAME = ?, EMAIL = ?, BUDGET = ? WHERE ID = ?;", [obj[1], password, obj[2], obj[3], obj[4], obj[0]]);
    }
    else{
        await db.connection.execute("UPDATE accounts SET PHONENUMBER = ?, FULLNAME = ?, EMAIL = ?, BUDGET = ? WHERE ID = ?;", [obj[1], obj[2], obj[3], obj[4], obj[0]]);
    }
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
    var tmp = obj[5].split("-");

    obj[5] = tmp[2] + "-" + tmp[1] + "-" + tmp[0];
    console.log(obj);
    const result =  await db.connection.execute('insert into accounts set ID = ?, PHONENUMBER = ?, PASSWORD = ?, FULLNAME = ?, EMAIL = ?, CREATEDDATE = ?, LEVEL = ?, IMAGE = ?, BUDGET = ?, ACTIVE = ?',
                                                                            [obj[0], obj[1], obj[2], obj[3], obj[4], obj[5], obj[6], 'null', obj[7], 1]);

    return result[0];
}

exports.setLockUnlock = async (id) => {
    var obj = Object.values(id);
    await db.connection.execute("UPDATE accounts SET ACTIVE = ? where ID = ?;", [obj[6], obj[0]]);
}

exports.getAllActive = async (category) => {
    if(category == "Ban")
        category = 0;
    else category = 1;
    const result = await db.connection.execute("select * from accounts where ACTIVE = ?", [category]);
    return result[0];
}

exports.getCategory = async () => {
    const result = await db.connection.execute("select distinct ACTIVE from accounts");
    return result[0];
}

exports.getSearch = async (search) => {
    const result = await db.connection.execute("select * from accounts  where PHONENUMBER like ?", [`%${search}%`]);
    return result[0];
}

exports.getNameAsc = async () => {
    const result = await db.connection.execute("select * from accounts ORDER BY PHONENUMBER ASC");
    return result[0];
}

exports.getNameDesc = async () => {
    const result = await db.connection.execute("select * from menu ORDER BY PHONENUMBER DESC");
    console.log(result[0]);
    return result[0];
}