const profileRepository = require('./profileRepository');

exports.changeInfo = async (fullname, phonenumber)=>{
    await profileRepository.changeInfo(fullname, phonenumber);
}

exports.changePassword = async (password, newpassword, renewpassword) =>{
    await profileRepository.changePassword(password, newpassword, renewpassword);
}