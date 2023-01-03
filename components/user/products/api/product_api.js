const productsService = require("../productsService");

exports.getReviewList = async (req, res) => {
  let paginator = new Paginator(6, 3);
  const { productID: productID } = req.query;
  const { page: curPage } = req.query;

  const count = await productsService.countReviewList(productID);

  let list = [];
  list = await productsService.getReviewList(
    productID,
    pagination_info.results,
    pagination_info.first_result
  );
  let pagination_info = paginator.build(count, curPage);

  return res.status(200).json({
    list: list,
    pagination_info: pagination_info,
  });
};
