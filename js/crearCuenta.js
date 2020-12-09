function init() {
  var inputFile = document.getElementById('inputFile1');
  inputFile.addEventListener('change', mostrarImagen, false);
}

function mostrarImagen(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = document.getElementById('img1');
    img.src= event.target.result;
  }
  reader.readAsDataURL(file);
}



function crearCuenta(){
    let boton = document.getElementById("btnCrea");
    let NU = document.getElementById("NU").value;
    let Contra = document.getElementById("contraseña").value;
    let Correo = document.getElementById("Email").value;
    if(NU==""||Contra==""||Correo==""){
      alert("Por favor completa todos los campos");
    }else{
    }
   let radioV=document.getElementById("selectusuarioidP").value;
   

    let radioA=document.getElementById("selectavatarini").value;

    console.log(NU);
    console.log(Contra);
    console.log(Correo);
    console.log(radioV);

    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8888/user", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(
      JSON.stringify({
        NombreUsuario: NU,
        Contraseña: Contra,
        Correo: Correo,
        PoP: radioV,
        Foto: radioA
      })
    );

    alert("Usuario registrado");
    
}


function fetch(){
    var button = document.getElementById("btnCreaC");
    if(button){
        button.addEventListener("click",crearCuenta, false );
    }

    window.addEventListener('load', init, false);
    document.getElementById("NU").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("Email").value = "";
   
};

window.onload = fetch();