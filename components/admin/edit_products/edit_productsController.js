const products = require("./edit_productsService");
const qs = require("qs");
exports.product = async (req, res) => {
  const { name: nameFilter } = req.query;
  let list_products = [];
  const { sort, withoutSort } = req.query;
  if (nameFilter) {
    list_products = await products.filter(nameFilter);
  } else list_products = await products.getAll();

  if(sort=="name"){
    list_products.sort((a,b)=> a.NAME-b.NAME);
  }else if(sort=="price"){
    list_products.sort((a,b)=> a.PRICE - b.PRICE);
  }

  res.render("admin/edit_products/products", {
    list_products,
    layout: "admin_layout",
    originalUrl: `${req.baseUrl}/edit_products?${qs.stringify(withoutSort)}`,
  });
};

exports.details = async (req, res, next) => {
  const { id:id } = req.params;

  const detail = await products.getId(id);
  res.render('admin/edit_products/details', {
    detail,
    layout: "admin_layout"});
};

exports.delete = async (req, res, next) => {
  const { id:id } = req.params;
  await products.delete(id);
  res.redirect("/admin/edit_products");
};

exports.saveEdit = async (req, res, next) => {
  const product = req.body;

  await products.saveEdit(product);

  res.redirect("/admin/edit_products");
};

exports.add = (req, res, next) => {
  res.render('admin/edit_products/add', {
    layout: "admin_layout"
  });
}

exports.saveAdd = async (req, res, next) => {
  const product = req.body;

  const nextId = await products.nextId();
  await products.add(product, nextId);
  res.render('admin/edit_products', {
    layout: "admin_layout"
  });
}

exports.paginator = async (req, res) => {
  try{
    console.log(req.query.category);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.size);
    let name = (req.query.namesorting === 'true');
    let price = (req.query.pricesorting === 'true');
    let category = req.query.category ? req.query.category : -1;
    let desc = (req.query.desc === 'true');

    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);

    var result = [];
    var arr = [];

    // NOT Filtering with salary
    if(category < 0 || category == 'All'){
      result = await products.getAll();
      for(var i in result)
        arr.push(result[i]);
      // not sorting with age
      if(name == true) {
        if(desc == false) { // sorting with name and ascending
          arr.sort((a,b)=> a.NAME-b.NAME);
        } else { // sorting with name and descending
          console.log(result);
          console.log("REVERSEEEEEEEEEEEEE");
          arr.sort((a,b)=> b.NAME-a.NAME);
          console.log(result);
        }
      }else if(price == true){
        if(desc == false) { // sorting with price and ascending
          arr.sort((a,b)=> a.PRICE-b.PRICE);
        } else { // sorting with name and descending
          arr.sort((a,b)=> b.PRICE-a.PRICE);
        }
      } else {
        arr.sort(function(a, b){return a - b});
      }
    } else { // Filtering with category
      // not sorting with age
      if(name == false) {
        result = await products.getCategory(category);
        for(var i in result)
          arr.push(result[i]);
      } else {
        if(desc == false) { // sorting with age and ascending

          result = await products.getCategory(category);
          for(var i in result)
            arr.push(result[i]);
          arr.sort((a,b)=> a.NAME-b.NAME);
        } else { // sorting with age and descending

          result = await products.getCategory(category);
          for(var i in result)
            arr.push(result[i]);
          arr.sort((a,b)=> b.NAME-a.NAME);
        }
      }
    }
    if(offset + limit >= result.length){
      var temp = arr.slice(offset, result.length);
    }
    else{
      var temp = arr.slice(offset, limit);
    }

    const totalPages = Math.ceil(result.length / limit);
    const response = {
      "totalPages": totalPages,
      "pageNumber": page,
      "pageSize": result.length,
      "products": temp
    };
    res.send(response);
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }
}

exports.getCategory = async (req, res) => {
  try {
    const result = await products.getAllCategory();
    var category = [];
    for(var i in result)
      category.push([result[i]['category']]);
    res.send(category);
  } catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT get all customer's salaries",
      error: error.message
    });
  }
}

exports.getSearch = async (req, res) => {
  try {

    const result = await products.getAllCategory();
    var category = [];
    for(var i in result)
      category.push([result[i]['category']]);
    res.send(category);
  } catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT get all customer's salaries",
      error: error.message
    });
  }
}