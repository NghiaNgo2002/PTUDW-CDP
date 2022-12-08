const globalVar = require("../../../routes/globalVar");

exports.statistic = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  if (req.query.year_month) {
    var start = req.query.year_month + "-01";
    var end = req.query.year_month + "-31";
    var index, sum = 0;
    var turnover = [];

    for (var i = 1; i < 32; i++) {
      turnover.push({day: "Day " + i, turnover: 0})
    }

  }
  res.render("admin/statistic/statistic", {agent, layout: "admin_layout" });
};
