const orders = require("./edit_ordersService");
const qs = require("qs");
const path = require('path');
const upload = require('../../../middleware/upload');
const resize = require('../../../middleware/edit_orders/resize');
exports.product = async (req, res) => {
    const { name: nameFilter } = req.query;
    let list_orders = [];
    const { sort, withoutSort } = req.query;
    if (nameFilter) {
        list_orders = await orders.filter(nameFilter);
    } else list_orders = await orders.getAll();

    if(sort=="name"){
        list_orders.sort((a,b)=> a.NAME-b.NAME);
    }else if(sort=="price"){
        list_orders.sort((a,b)=> a.PRICE - b.PRICE);
    }

    res.render("admin/list_orders/orders", {
        list_orders,
        layout: "admin_layout",
        originalUrl: `${req.baseUrl}/edit_orders?${qs.stringify(withoutSort)}`,
    });
};

exports.details = async (req, res, next) => {
    const { id:id } = req.params;

    const detail = await orders.getId(id);
    res.render('admin/list_orders/details', {
        detail,
        layout: "admin_layout"});
};

exports.delete = async (req, res, next) => {
    const { id:id } = req.params;
    await orders.delete(id);
    res.redirect("/admin/list_orders");
};

exports.saveEdit = async (req, res, next) => {
    const id = req.body.UserID;
    const imagePath = path.join(__dirname,'../../../','/public/assets_menu/img/menu');
    const product = req.body;
    if (!req.file) {
        await orders.saveEdit(product);
        res.redirect("/admin/list_orders");
    }
    else {
        const fileUpload = new resize(imagePath, id);

        const filename = await fileUpload.save(req.file.buffer);
        await orders.saveEdit(product);
        res.redirect("/admin/list_orders");
    }
};


exports.paginator = async (req, res) => {
    try{
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
        let search = req.query.search ? req.query.search : -1;
        let name = (req.query.namesorting === 'true');
        let price = (req.query.pricesorting === 'true');
        let category = req.query.category ? req.query.category : -1;
        let desc = (req.query.desc === 'true');

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        var result = [];
        var arr = [];

        if(search != -1){
            result = await orders.getSearch(search);
            for (var i in result)
                arr.push(result[i]);
        }else {
            // NOT Filtering with salary
            if (category < 0 || category == 'All') {
                // not sorting with name
                if (name == true) {
                    if (desc == false) { // sorting with name and ascending
                        let sort = 'asc';
                        result = await orders.getNameSorted(sort);
                        for (var i in result)
                            arr.push(result[i]);
                    } else { // sorting with name and descending
                        let sort = 'desc';
                        result = await orders.getNameSorted(sort);
                        for (var i in result)
                            arr.push(result[i]);
                    }
                } else if (price == true) {
                    result = await orders.getAll();
                    for (var i in result)
                        arr.push(result[i]);
                    if (desc == false) { // sorting with price and ascending
                        arr.sort((a, b) => a.PRICE - b.PRICE);
                    } else { // sorting with name and descending
                        arr.sort((a, b) => b.PRICE - a.PRICE);
                    }
                } else {
                    result = await orders.getAll();
                    for (var i in result)
                        arr.push(result[i]);

                }
            } else { // Filtering with category
                // not sorting with name
                if (name == true) {
                    if (desc == false) { // sorting with name and ascending
                        result = await orders.getCategory(category);
                        for (var i in result)
                            arr.push(result[i]);

                    } else { // sorting with name and descending

                        result = await orders.getCategory(category);
                        for (var i in result)
                            arr.push(result[i]);
                    }
                } else if(price == true){
                    result = await orders.getCategory(category);
                    for (var i in result)
                        arr.push(result[i]);
                    if (desc == false) { // sorting with price and ascending
                        arr.sort((a, b) => a.PRICE - b.PRICE);
                    } else { // sorting with name and descending
                        arr.sort((a, b) => b.PRICE - a.PRICE);
                    }
                }
                else {
                    result = await orders.getCategory(category);
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
            "orders": temp
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
        const result = await orders.getAllCategory();
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
