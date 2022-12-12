const db = require('../../db/index');
const moment = require('moment');

exports.getUserByPhonenumber = async(phonenumber) => {
    const result = await db.connection.execute("select * from accounts where phonenumber like ? limit 1", [phonenumber]);
    return result[0] && result[0][0];
}

exports.phonenumberExists = async(phonenumber) => {
    const result = await db.connection.execute('select phonenumber from accounts where phonenumber = ? limit 1', [phonenumber]);
    return result[0].length > 0;
}

exports.emailExists = async(email) => {
    const result = await db.connection.execute('select email from accounts where email = ? limit 1', [email]);
    return result[0].length > 0;
}

exports.insertUser = async(fullname, phonenumber, email, hash) => {
    await db.connection.execute('insert into accounts (PHONENUMBER,PASSWORD,FULLNAME,EMAIL,CREATEDDATE,LEVEL,BUDGET,ACTIVE) VALUES (?,?,?,?,?,?,?,?)',[phonenumber, hash, fullname, email, moment().format(),'Bronze','0','1']);
}