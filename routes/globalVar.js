var isLogin = false;

exports.getIsLogin = ()=>{
    return isLogin;
}

exports.changeIsLogin = (val)=>{
    isLogin = val;
}