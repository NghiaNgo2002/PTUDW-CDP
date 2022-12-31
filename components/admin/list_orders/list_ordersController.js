const orders = require("./list_ordersService");
exports.order = async (req, res) => {
    res.render("admin/list_orders/orders", {
        layout: "admin_layout",
    });
};

exports.details = async (req, res, next) => {
    const { id:idparam } = req.params;
    const detail = await orders.getId(idparam);
    detail["idparam"] = idparam;
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
    const product = req.body;
    product["idbill"] = req.params.id;
    console.log(product);
    await orders.saveEdit(product);
    res.redirect("/admin/list_orders");

};


exports.paginator = async (req, res) => {
    try{
        console.log(req.body);
        let page = parseInt(req.body.page);
        let limit = parseInt(req.body.size);
        let search = req.body.search ? req.body.search : -1;
        let category = req.body.category ? req.body.category : -1;

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        var result = [];

        if(search != -1){
            result = await orders.getSearch(search);
        }else {
            // NOT Filtering
            if (category < 0 || category == 'All') {
                result = await orders.getLimit(offset, limit);
            } else { // Filtering with category
                result = await orders.getCategoryLimit(category, offset, limit);
            }
        }

        const totalPages = 5;
        const response = {
            "totalPages": totalPages,
            "pageNumber": page,
            "pageSize": result.length,
            "orders": result
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
