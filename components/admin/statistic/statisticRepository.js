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

exports.getPrice = async (year) => {
    const result =  await db.connection.execute('select sum(PRICE) as PRICE, MONTH(TIME) as TIME from history where YEAR(TIME) = ? group by MONTH(TIME)', [year]);
    return result[0];
}

exports.getTopProducts = async () => {
    const result =  await db.connection.execute('select name, count(*) as counts from history_detail group by NAME order by count(*) desc limit 3');
    return result[0];
}

exports.getYear = async () => {
    const result =  await db.connection.execute('select distinct year(TIME) as year from history');
    return result[0];
};

exports.getMonth = async (month) => {
    var year = new Date().getFullYear();
    const result =  await db.connection.execute('select sum(PRICE) as PRICE, DAY(TIME) as TIME from history where month(TIME) = ? and year(TIME) = ? group by DAY(TIME)', [month, year]);
    return result[0];
}