const apiRepository = require('./apiRepository');

exports.phonenumberExists = async (phonenumber) => {
    return await apiRepository.phonenumberExists(phonenumber);
}

exports.emailExists = async (email) => {
    return await apiRepository.emailExists(email);
}