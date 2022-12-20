const accounts = require("./accountsService");
const qs = require("qs");
const bcrypt = require('bcryptjs');

exports.account = async (req, res) => {
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
    layout: "admin_layout",
    originalUrl: `${req.baseUrl}/edit_accounts?${qs.stringify(withoutSort)}`,
  });
};

exports.details = async (req, res, next) => {
  const { id:id } = req.params;
  
  const detail = await accounts.getId(id);
  
  res.render('admin/edit_accounts/details', {
    detail,
    layout: "admin_layout"});
};

exports.delete = async (req, res, next) => {
  const account = req.body;

  await accounts.delete(account);
  res.redirect("/admin/edit_accounts");
};

exports.saveEdit = async (req, res, next) => {
  const account = req.body;
  console.log(account);

  await accounts.saveEdit(account);
  
  res.redirect("/admin/edit_accounts");
};

exports.add = async (req, res, next) => {
  const nextId = await accounts.nextId();
  res.render('admin/edit_accounts/add', {
    nextId,
    layout: "admin_layout"
  });
}

exports.saveAdd = async (req, res, next) => {
  const account = req.body;
  console.log(account);
  console.log(account['Password']);
  var password = account['Password'];
  const salt = await bcrypt.genSalt(10);
  var tmp = await bcrypt.hash(password, salt);
  account['Password'] = tmp;
  await accounts.add(account);
  res.redirect('/admin/edit_accounts');
}

exports.setLock = async (req, res, next) => {
  const account = req.body;
  account['ACTIVE'] = 0;
  await accounts.setLock(account);
  res.redirect('/admin/edit_accounts');
}

exports.setUnLock = async (req, res, next) => {
  const account = req.body;
  account['ACTIVE'] = 1;
  await accounts.setUnLock(account);
  res.redirect('/admin/edit_accounts');
}

exports.paginator = async (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.size);
    let search = req.query.search ? req.query.search : -1;
    let phone = (req.query.phonesorting === 'true');
    let date = (req.query.datesorting === 'true');
    let category = req.query.category ? req.query.category : -1;
    let desc = (req.query.desc === 'true');

    const offset = page ? page * limit : 0;
    console.log(category);
    console.log("offset = " + offset);

    var result = [];
    var arr = [];

    if(search != -1){
      result = await accounts.getSearch(search);
      for (var i in result)
        arr.push(result[i]);
    }else {
      // NOT Filtering with salary
      if (category < 0 || category == 'All') {
        // not sorting with name
        if (phone == true) {
          if (desc == false) { // sorting with name and ascending
            let sort = 'asc';
            result = await accounts.getNameSorted(sort);
            for (var i in result)
              arr.push(result[i]);
          } else { // sorting with name and descending
            let sort = 'desc';
            result = await accounts.getNameSorted(sort);
            for (var i in result)
              arr.push(result[i]);
          }
        } else if (date == true) {
          result = await accounts.getAll();
          for (var i in result)
            arr.push(result[i]);
          if (desc == false) { // sorting with price and ascending
            arr.sort((a, b) => a.DATE - b.DATE);
          } else { // sorting with name and descending
            arr.sort((a, b) => b.DATE - a.DATE);
          }
        } else {
          result = await accounts.getAll();
          for (var i in result)
            arr.push(result[i]);
        }
      } else { // Filtering with category
        // not sorting with age
        if (phone == false) {
          result = await accounts.getAllActive(category);
          for (var i in result)
            arr.push(result[i]);
        } else {
          if (desc == false) { // sorting with age and ascending

            result = await accounts.getAllActive(category);
            for (var i in result)
              arr.push(result[i]);

          } else { // sorting with name and descending

            result = await accounts.getAllActive(category);
            for (var i in result)
              arr.push(result[i]);
          }
        }
      }
    }

    if(offset + limit >= result.length){
      var temp = arr.slice(offset, result.length);
    }
    else{
      var temp = arr.slice(offset, offset + limit);
    }
    const totalPages = Math.ceil(result.length / limit);
    const response = {
      "totalPages": totalPages,
      "pageNumber": page,
      "pageSize": result.length,
      "accounts": temp
    };
    res.send(response);
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }
}

exports.getActive = async (req, res) => {
  try {
    const result = await accounts.getAllActive();
    var category = [];
    for(var i in result)
      category.push([result[i]['ACTIVE']]);
    res.send(category);
  } catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT get all customer's salaries",
      error: error.message
    });
  }
}

