const db = require('../../../db/index');

exports.editInfo = async(fullname, phonenumber, email) => {
    const temp = Object.values(agent);
    await db.connection.execute("UPDATE accounts SET FULLNAME = ?, PHONENUMBER = ?, EMAIL = ? WHERE PHONENUMBER = ?;", [fullname, phonenumber, email, temp[1]]);
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [phonenumber]);
    agent = result[0][0];
}

exports.changePassword = async(newpassword) => {
    const temp = Object.values(agent);
    await db.connection.execute("UPDATE accounts SET PASSWORD = ? WHERE PHONENUMBER = ?;", [newpassword, temp[1]]);
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [temp[1]]); 
    agent = result[0][0];
}