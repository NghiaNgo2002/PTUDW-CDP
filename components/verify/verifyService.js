const verifyRepository = require('./verifyRepository');

exports.verifyAccount = async (ID)=>{
    await verifyRepository.verifyAccount(ID);
}