const authorizeService = require('./authorizeService');

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const registerSchema = require('./schema/register');

const ajv = new Ajv();
addFormats(ajv);

exports.showLoginForm = (req, res) =>{
    res.render('_auth/login', { title: 'Express', layout: false});
}

exports.showRegisterForm = (req, res) =>{
    res.render('_auth/register', { title: 'Express', layout: false});
}

exports.register = async (req, res) => {
    if(!ajv.validate(registerSchema, req.body)){
        res.render('_auth/register', { title: 'Express', layout: false, error: 'Invalid input!'});
        return;
    }
    const {
        fullname : fullname,
        phonenumber : phonenumber,
        email : email,
        password : password,
        repeatpassword : repeatpassword
    } = req.body;
    if(password !== repeatpassword){
        res.render('_auth/register', { title: 'Express', layout: false, error: 'Passwords do not match!'});
        return;
    }
    try{
        await authorizeService.register(fullname, phonenumber, email, password);
    }catch(e){
        res.render('_auth/register', { title: 'Express', layout: false, error: e.message});
        return;
    }
    res.redirect('/');
}
