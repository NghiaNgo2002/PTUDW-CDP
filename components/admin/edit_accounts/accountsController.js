const globalVar = require("../../../routes/globalVar");
const accounts = require("./accountsService");
const qs = require("qs");
exports.account = async (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { name: nameFilter } = req.query;
  let list_accounts = [];
  const { sort, withoutSort } = req.query;
  if (nameFilter) {
    list_accounts = await accounts.filter(nameFilter);
  } else list_accounts = await accounts.getAll();

  for(let i =  1; i < list_accounts.length; i++)
  {
    var t = list_accounts[i]['CREATEDDATE'];
    var t = t.toString();
    var m = t.split(" ");
    m[1] = m[1].toLowerCase();

    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    m[1] = months.indexOf(m[1]);
    var new_date = m[2] + "-" + m[1] + "-" + m[3];
    t = new_date;
    list_accounts[i]['CREATEDDATE'] = t;
  }
  list_accounts[0]['CREATEDDATE'] = "";

  if(sort=="name"){
    list_accounts.sort((a,b)=> a.PHONENUMBER-b.PHONENUMBER);
  }else if(sort=="date"){
    list_accounts.sort((a,b)=> a.CREATEDDATE - b.CREATEDDATE);
  }

  res.render("admin/edit_accounts/accounts", {
    list_accounts,
    agent,
    layout: "admin_layout",
    originalUrl: `${req.baseUrl}/edit_accounts?${qs.stringify(withoutSort)}`,
  });
};

exports.details = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { id:id } = req.params;

  const detail = await accounts.getId(id);

  res.render('admin/edit_accounts/details', {
    detail,
    agent,
    layout: "admin_layout"});
};

exports.delete = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const account = req.body;

  await accounts.delete(account);
  res.redirect("/admin/edit_accounts");
};

exports.saveEdit = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const account = req.body;


  if (account['isRePass'] == 'true') {
    account['password'] = '1234';
  }
  //delete account.isRePass;
  await accounts.saveEdit(account);

  res.redirect("/admin/edit_accounts");
};

exports.add = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const nextId = await accounts.nextId();
  res.render('admin/edit_accounts/add', {
    nextId,
    agent,
    layout: "admin_layout"
  });
}

exports.saveAdd = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const account = req.body;
  await accounts.add(account);
  res.redirect('/admin/edit_accounts');
}

exports.setLock = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const account = req.body;
  account['ACTIVE'] = 0;
  await accounts.setLock(account);
  res.redirect('/admin/edit_accounts');
}

exports.setUnLock = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const account = req.body;
  account['ACTIVE'] = 1;
  await accounts.setUnLock(account);
  res.redirect('/admin/edit_accounts');
}