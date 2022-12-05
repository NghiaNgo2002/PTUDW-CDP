global.isLogin = 0;
global.agent = {};

exports.getIsLogin = ()=>{
    return isLogin;
}

exports.changeIsLogin = (val)=>{
    isLogin = val;
}