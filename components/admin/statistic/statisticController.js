const globalVar = require("../../../routes/globalVar");

exports.statistic = (req, res) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] !== 1){
      res.redirect("/user");
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
