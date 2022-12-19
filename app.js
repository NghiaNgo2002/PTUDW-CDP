const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require('express-session');

const indexRouter = require("./routes/index");
const authRouter = require("./components/_auth/index");
const usersRouter = require("./components/user/index");
const adminRouter = require("./components/admin/index");
const apiRouter = require("./components/_auth/api/index");
const user_auth = require("./middleware/user");
const admin_auth = require("./middleware/admin");
const auth_auth = require("./middleware/auth");
const passport = require("./components/_auth/passport/index");
const hbs = require("express-handlebars");
const app = express();

// view engine setup
app.engine('.hbs',
    hbs.engine({
        defaultLayout: 'admin_layout.hbs',
          layoutsDir: 'views',
          extname: '.hbs',
          helpers: {
            when: function(operand_1, operator, operand_2, options) {
              var operators = {
                'eq': function(l,r) { return l == r; },
                'noteq': function(l,r) { return l != r; },
                'gt': function(l,r) { return Number(l) > Number(r); },
                'or': function(l,r) { return l || r; },
                'and': function(l,r) { return l && r; },
                '%': function(l,r) { return (l % r) === 0; },
                'sum': function(l,r) { return l + r; }
              }
                  , result = operators[operator](operand_1,operand_2);

              if (result) return options.fn(this);
              else  return options.inverse(this);
            }
        }
    }
));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(session({
    secret: 'very secret keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", auth_auth, authRouter);
app.use("/user", user_auth, usersRouter);
app.use("/admin", admin_auth, adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { layout: false });
});

module.exports = app;
