const statistic = require("./statisticService")
exports.statistic = async (req, res) => {
  if (req.query.year_month) {
    var start = req.query.year_month + "-01";
    var end = req.query.year_month + "-31";
    var index, sum = 0;
    var turnover = [];

    for (var i = 1; i < 32; i++) {
      turnover.push({day: "Day " + i, turnover: 0})
    }
  }
  var arr = []
  let result = await statistic.getPrice();

  console.log(result);
  console.log(result["PRICE"]);

  for (var i = 0; i < result.length; i++) {
    arr.push(result.price[i]);
  }
  console.log(arr);
  console.log("CONTROLLERR!!!");
  res.render("admin/statistic/statistic", {
    arr,
    layout: "admin_layout" });
};
