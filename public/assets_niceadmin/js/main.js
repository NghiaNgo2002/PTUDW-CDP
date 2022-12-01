function login(){
    console.log("Login successfully!");
    username = document.getElementById("yourUsername").value;
    password = document.getElementById("yourPassword").value;
    if(username==="user" && password==="123"){
        window.location.replace("/access/user");
    }
    else if(username==="admin" && password==="123"){
        window.location.replace("/access/admin");
    }
    else{
        window.location.replace("/");
    }
}

