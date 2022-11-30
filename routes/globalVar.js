global.isLogin = 0;

exports.getIsLogin = ()=>{
    return isLogin;
}

exports.changeIsLogin = (val)=>{
    isLogin = val;
}