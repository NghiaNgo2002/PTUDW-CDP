var isLogin = false;

exports.getIsLogin = ()=>{
    return isLogin;
}

exports.changeIsLogin = (val)=>{
    isLogin = val;
}

exports.checkLogin = (username, password)=>{
    if(username === "user" && password ==="123")
        return true;
}