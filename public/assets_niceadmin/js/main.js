function login(){
    console.log("Login successfully!");
    username = document.getElementById("yourUsername").value;
    password = document.getElementById("yourPassword").value;
    if(username==="user" && password==="123"){
        window.location.replace("http://localhost:3000/access/user");
    }
    else if(username==="admin" && password==="123"){
        window.location.replace("http://localhost:3000/access/admin");
    }
    else{
        window.location.replace("http://localhost:3000/");
    }
}

