const profileRepository = require('./profileRepository');

exports.changeInfo = async (fullname, phonenumber)=>{
    await profileRepository.changeInfo(fullname, phonenumber)
}