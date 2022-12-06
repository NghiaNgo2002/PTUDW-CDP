const globalVar = require("../../../routes/globalVar");
const accounts = require("./accountsService");
exports.account = async (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  let list_accounts = await accounts.getAll();
  console.log(list_accounts);
  res.render("admin/edit_accounts/accounts", {
    list_accounts,
    agent,
    layout: "admin_layout" });
};

exports.details = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { id:id } = req.params;
  console.log(req.params);
  const detail = await accounts.getId(id);
  console.log(detail.ACTIVE);
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
  const { accountId } = req.params;
  await accounts.delete(accountId);
  res.render('admin/edit_accounts/details',{
    agent,
    layout: "admin_layout"});
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
  console.log(req.body);
  res.redirect("/admin/edit_accounts");
};

exports.add = (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render('admin/edit_accounts/add', {
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
  console.log(account);
  await accounts.add(account);
  res.render('admin/edit_accounts', {
    agent,
    layout: "admin_layout"
  });
}
