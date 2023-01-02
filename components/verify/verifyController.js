const nodemailer = require("nodemailer");
const verifyService = require("./verifyService");

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "netcafe.cdp@gmail.com",
        pass: "klrzkgiazzxskfck"
    }
});

var ID, mailOptions_account, mailOptions_password, host, link;

exports.showAccount = (req, res) => {
    res.render('verify/account', {layout: false});
}

exports.emailAccount = async (req, res) =>{
    ID = req.user.ID;
    host = req.get('host');
    link = "https://"+host+"/verify/verifyAccount?id="+ID;
    mailOptions_account = {
        from: "netcafe.cdp@gmail.com",
        to : req.user.EMAIL,
        subject : "PLEASE CONFIRM YOUR EMAIL ACCOUNT",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    await smtpTransport.sendMail(mailOptions_account, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.response);
        }
    });
    res.redirect('/verify');
}

exports.verifyAccount = (req, res) => {
    if(req.get('host')===(host)){
        if(Number(req.query.id)===ID)
        {
            console.log("email is verified");
            //res.end("<h1>Email "+mailOptions_account.to+" is been Successfully verified");
            verifyService.verifyAccount(ID);
            res.render('verify/account_successful', {layout: false});
            req.logout(function (err){
                if(err){
                    return next(err);
                }
                //res.redirect('/');
            })
        }
        else
        {   
            console.log("email is not verified");
            res.render('verify/account_failed', {layout: false});
            //res.end("<h1>Bad Request</h1>");
        }
    }else{
        res.end("<h1>Request is from unknown source");
    }
}

exports.emailPassword = (req, res) => {
    res.render('verify/password', {layout: false});
}

exports.verifyPassword = (req, res) => {
    if((req.protocol+"://"+req.get('host'))===("https://"+host)){
        if(req.query.id===ID)
        {
            console.log("email is verified");
            res.render('verify/account_successful', {layout: false});
        }
        else
        {   
            console.log("email is not verified");
            res.render('verify/account_failed', {layout: false});
        }
    }else{
        res.render('verify/account_failed', {layout: false});
    }
}