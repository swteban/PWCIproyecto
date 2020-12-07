
function logIn(){
    var req = new XMLHttpRequest();
    req.open ("GET","http://localhost:8888/user",true);

    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var entro = false;
            var usuario = document.getElementById("formula1").value;
            var contra = document.getElementById("formula").value;
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);

            parse[0].forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
                if( (k.NombreUsuario == usuario) && (contra == k.Contraseña))
                {
                    console.log("Awaken my love");
                    entro = true;
                   localStorage.setItem("ID",k.IdUsuario);
                   
                }
                else{
                    if(entro == false){
                        console.log("Sleep my love");
                        entro = false;
                    }
                }
            });

            if(entro == false){
                alert("Usuario y Contraseña no coinciden");
            }
            else{
                window.open("Landingpage.html","_self");
            }
        }
    }
     req.send();
};





function fetch(){
    var button = document.getElementById("ingresa");
    if(button){
        button.addEventListener("click",logIn, false );
    }
    
    var req = new XMLHttpRequest();
    req.open ("GET","http://localhost:8888/user",true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var usuario = document.getElementById("formula1");
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            console.log(parse[0]);
            parse[0].forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
                
            });
        }
        else{
            console.log("hola");
        }
    }
    req.send();
};

window.onload = fetch();

/*window.onload = function () {
    let userForm = document.forms["user"];
    userForm.addEventListener("submit", sendUser);
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/user", true);
  
    req.onreadystatechange = function (data) {
      if (req.readyState == 4 && req.status == 200) {
        var users = document.querySelector("div#users");
        var fecthData = data.target.response;
        var parse = JSON.parse(fecthData);
        console.log(fecthData);
        //   users.append(fecthData);
        //   console.log(parse);
        //   users.append(parse);
        parse.forEach((k, v) => {
          console.log(`K: ${k.usersName}`);
          console.log(`V: ${v}`);
          users.innerHTML += divFormat(k.usersName, k.userPassword);
        });
      }
    };
    req.send();
  };*/