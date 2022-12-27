const statistic = require("./statisticService")
exports.statistic = async (req, res) => {
  res.render("admin/statistic/statistic", {
    layout: "admin_layout" });
};

exports.statisticData = async (req, res) => {

  var arr = []

  let result = await statistic.getPrice();

  for(let i =  0; i < result.length; i++)
  {
    var t = result[i]['TIME'];
    var t = t.toString();
    var m = t.split(" ");
    m[1] = m[1].toLowerCase();

    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    m[1] = months.indexOf(m[1]);
    var new_date = m[2] + "-" + m[1] + "-" + m[3];
    t = new_date;
    result[i]['TIME'] = t;
  }

  arr = Object.values(result);
  res.send(arr);
};

exports.topProductsData = async (req, res) => {
  var arr = []

  let result = await statistic.getTopProducts();
  console.log(result);
  res.send(result);
}