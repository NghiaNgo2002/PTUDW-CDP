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
  var t_arr = []
  var p_arr = []
  let result = await statistic.getPrice();
  console.log(result);
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
    t_arr.push(t);
    p_arr.push(result[i]['PRICE']);
  }


  arr = Object.values(result);
  console.log(arr);
  console.log(arr.TIME);
  res.render("admin/statistic/statistic", {
    arr,
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