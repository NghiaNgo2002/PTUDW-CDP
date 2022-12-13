const globalVar = require("../../../routes/globalVar");

exports.statistic = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] !== 1){
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
  res.render("admin/statistic/statistic", { layout: "admin_layout" });
};
