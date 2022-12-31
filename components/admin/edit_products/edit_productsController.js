const products = require("./edit_productsService");
const qs = require("qs");
const path = require('path');
const upload = require('../../../middleware/upload');
const resize = require('../../../middleware/edit_products/resize');
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
  const id = req.body.UserID;
  const imagePath = path.join(__dirname,'../../../','/public/assets_menu/img/menu');
  const product = req.body;
  if (!req.file) {
    await products.saveEdit(product);
    res.redirect("/admin/edit_products");
  }
  else {
    const fileUpload = new resize(imagePath, id);

    const filename = await fileUpload.save(req.file.buffer);
    await products.saveEdit(product);
    res.redirect("/admin/edit_products");
  }
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
    let page = parseInt(req.body.page);
    let limit = parseInt(req.body.size);
    let search = req.body.search ? req.body.search : -1;
    let name = (req.body.namesorting === 'true');
    let price = (req.body.pricesorting === 'true');
    let category = req.body.category ? req.body.category : -1;
    let desc = (req.body.desc === 'true');

    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);

    var result = [];
    var arr = [];

    if(search != -1){
      result = await products.getSearch(search);
      for (var i in result)
        arr.push(result[i]);
    }else {
      // NOT Filtering with salary
      if (category < 0 || category == 'All') {
        // not sorting with name
        if (name == true) {
          if (desc == false) { // sorting with name and ascending
            let sort = 'asc';
            result = await products.getNameSorted(sort);
            for (var i in result)
              arr.push(result[i]);
          } else { // sorting with name and descending
            let sort = 'desc';
            result = await products.getNameSorted(sort);
            for (var i in result)
              arr.push(result[i]);
          }
        } else if (price == true) {
          result = await products.getAll();
          for (var i in result)
            arr.push(result[i]);
          if (desc == false) { // sorting with price and ascending
            arr.sort((a, b) => a.PRICE - b.PRICE);
          } else { // sorting with name and descending
            arr.sort((a, b) => b.PRICE - a.PRICE);
          }
        } else {
          result = await products.getAll();
          for (var i in result)
            arr.push(result[i]);

        }
      } else { // Filtering with category
        // not sorting with name
        if (name == true) {
          if (desc == false) { // sorting with name and ascending
            result = await products.getCategory(category);
            for (var i in result)
              arr.push(result[i]);

          } else { // sorting with name and descending

            result = await products.getCategory(category);
            for (var i in result)
              arr.push(result[i]);
          }
        } else if(price == true){
          result = await products.getCategory(category);
          for (var i in result)
            arr.push(result[i]);
          if (desc == false) { // sorting with price and ascending
            arr.sort((a, b) => a.PRICE - b.PRICE);
          } else { // sorting with name and descending
            arr.sort((a, b) => b.PRICE - a.PRICE);
          }
        }
        else {
          result = await products.getCategory(category);
          for (var i in result)
            arr.push(result[i]);
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
      message: "Error -> Can NOT get all category",
      error: error.message
    });
  }
}
