const db = require('../../../db/index');

exports.editInfo = async(fullname, phonenumber, email, current_phonenumber) => {
    await db.connection.execute("UPDATE accounts SET FULLNAME = ?, PHONENUMBER = ?, EMAIL = ? WHERE PHONENUMBER = ?;", [fullname, phonenumber, email, current_phonenumber]);
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [phonenumber]);
    return result[0][0];
}

exports.changePassword = async(newpassword, phonenumber) => {
    await db.connection.execute("UPDATE accounts SET PASSWORD = ? WHERE PHONENUMBER = ?;", [newpassword, phonenumber]);
    const result = await db.connection.execute("SELECT * FROM accounts where PHONENUMBER like ?;", [phonenumber]); 
    return result[0][0];
}