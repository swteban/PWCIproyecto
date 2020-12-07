
function editar(){ //Este es cuando le picas a que se abra el modal
    var IDE = localStorage.getItem("ID");
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/user/${IDE}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            
            parse.forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
                document.getElementById("nombreE").value = k.NombreUsuario;
                document.getElementById("correoE").value = k.Correo;
                document.getElementById("contrasenaE").value = k.Contraseña;
                if(k.PoP.data[0] == 1)
                {
                    document.getElementById("publicoE").checked  = true;
                    document.getElementById("privadoE").checked = false;
                }
                else{
                    document.getElementById("publicoE").checked  = false;
                    document.getElementById("privadoE").checked = true;
                }
                
               
            });
        }
        else{
            console.log("hola");
        }
    }
    req.send();
}

function EditarInfo() //Este ya lo envias a la bdd
{
    var IDedit = localStorage.getItem("ID");
    let NU =     document.getElementById("nombreE").value;
    let Contra = document.getElementById("contrasenaE").value
    let Correo = document.getElementById("correoE").value;
    if(NU==""||Contra==""||Correo==""){
        alert("Te falto un campo");
      }else{
        //poner lo otro
    }
   let radioPop;
   if(document.getElementById("publicoE").checked == true)
   {
        radioPop = 1;
   }
   else{
       radioPop = 0;
   }
    
   let avatar;
   if(document.getElementById("womi").checked == true)
   {
        avatar = 1;
   }
   else{
       avatar = 2;
   }

    console.log(NU);
    console.log(Contra);
    console.log(Correo);
    console.log(radioPop);

    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8888/editar", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(
      JSON.stringify({
        NombreUsuario: NU,
        Contraseña: Contra,
        Correo: Correo,
        PoP: radioPop,
        Foto: avatar,
        IdUsuario: IDedit
      })
    );

    onclick = location.reload();
}

function EditarList() //Este ya lo envias a la bdd
{
    var IDedit = localStorage.getItem("ID");
    let idList = document.getElementById("idlist").value;
    let NL =     document.getElementById("nombreedit").value;
    let Descri = document.getElementById("descripcionedit").value;

    
   let radioPop;

   if(document.getElementById("publicoEd").checked == true)
   {
        radioPop = 1;
   }
   else{
       radioPop = 0;
   }
    

    console.log(NL);
    console.log(Descri);
    console.log(radioPop);

    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8888/updatear", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(
      JSON.stringify({
        NombreLista: NL,
        PrivPub: radioPop,
        Descripcion: Descri,
        IdLista: idList
      })
    );

    onclick = location.reload();
}

function EliminarList(){

  var IDedit = localStorage.getItem("ID");
  var idListaa = document.getElementById("idlistelimi").value;

  var req = new XMLHttpRequest(); 
  req.open("POST",`http://localhost:8888/eliminar/${idListaa}`, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(
    JSON.stringify({
      idlist: idListaa
    })
  );

  console.log("Exito mi pricha");

  onclick = location.reload();

}

$(document).click(function(event) {
    var text = $(event.target).text();
    localStorage.setItem("nombreLista", text);
  });
  
  $("#ListasUsuario").on("click", "#nombrelink", function (event) {
   window.location.href='MostrarLista.html';
  });

  $("#ListasUsuario").on("click", "#edit", function (event) {
    //
   });



function fetch(){

   localStorage.setItem("ini",0);
   localStorage.setItem("perfi",1);

    var ID = localStorage.getItem("ID");

   

    var button = document.getElementById("editar");
    if(button){
        button.addEventListener("click",editar, false );
    }

    var buttonE = document.getElementById("Editadito");
    if(buttonE){
        buttonE.addEventListener("click",EditarInfo, false );
    }
    
   var buttonD = document.getElementById("botoneditguardar");
   if(buttonD){
     
     buttonD.addEventListener("click",EditarList,false);
   }

   var buttonF = document.getElementById("confirmarelimi");
   if(buttonF){
     buttonF.addEventListener("click",EliminarList,false);
   }

    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/user/${ID}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let pic=0;
            
            parse.forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
                document.getElementById("usuario").innerHTML = k.NombreUsuario;
                document.getElementById("Nombre").innerHTML = k.NombreUsuario;
                document.getElementById("Correo").innerHTML = k.Correo;
                if(k.PoP.data[0] == 1)
                {
                    document.getElementById("PoP").innerHTML = "Publico";
                }
                else{
                    document.getElementById("PoP").innerHTML = "Privado";
                }

                if(k.Foto==1){
                  $("#fotoP").prepend(`
                  <img src="img/wom.jpg"  alt="" class="img-rounded" style="padding-top:20px; width:300px; height:300px;">
                  `);
                }
                else if(k.Foto==2){
                  $("#fotoP").prepend(`
                  <img src="img/man.jpg"  alt="" class="img-rounded" style="padding-top:20px; width:300px; height:300px;">
                  `);
                }
               
            });
        }
        else{
            console.log("hola");
        }
    }
    req.send();


    var req2 = new XMLHttpRequest();
    req2.open("GET",`http://localhost:8888/verListaUsuario/${ID}`, true);
    req2.onreadystatechange = function (data) {
        if (req2.readyState == 4 && req2.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let idslistas=0;
            let numlistas=0;
            
            parse[0].forEach((k, v) => {
                if(k.PrivPub.data[0] == 1)
                {
                   var pop = "Publico";
                }
                else{
                    var pop = "Privado";
                }

               idslistas= k.IdLista;
               console.log("IDsss: "+ k.IdLista);

                $("#ListasUsuario").prepend(`
                <div class="contenedorlista card text-white bg-dark flex-md-row mb-3">
                  <div class="listafilaaa row no-gutters">

                    <div class="col-md-4">
                      <img src="img/perfi.png" class="imagencarta card-img flex-auto" alt="Imagenlista" style="width:250px;">
                    </div>

                    <div class="col-md-8">

                      <div class="cuerpolista card-body d-flex flex-column">

                          <strong class="d-inline-block mb-2 text-white">${pop} | ID: ${k.IdLista} </strong>

                          <h4 class="mb-0 Tcarta card-title">
                              <a class="Tcarta text-white" id="nombrelink" href="#">${k.NombreLista}</a>
                          </h4>

                          <p class="Dcarta card-text mb-auto">${k.Descripcion}</p>
                          <br>

                         
                        
                      </div>

                    </div>

                  </div>
                  
                </div> 
                      `)
                numlistas++;
            });
        }
        else{
            console.log("hola");
        }
    }
    req2.send();
};

window.onload = fetch();