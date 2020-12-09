function buscarL(){
   
    let busca = document.getElementById("buscar").value;
    
    $("#Listas").empty();
   
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/busquedanombre/${busca}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let listas = 1;
            parse[0].forEach((k, v) => {
                
                    $( "#Listas" ).prepend( `
                    <div class="Fila row">

                    <div class="Columnaizquierda col-md-12">
     
                       <div class="Cartacontenedor card text-white bg-dark flex-md-row mb-4 shadow-sm h-md-250">
    
                          <div class="Cartacuerpo card-body d-flex flex-column align-items-start">
    
                             <strong class="d-inline-block mb-2 text-white">Lista</strong>
    
                             <h4 class="mb-0">
                               <a class="TituloCarta text-white" href="#" id="verLista${listas}">${k.NombreLista}</a> 
                             </h4>
    
                             <p class="DesCarta card-text mb-auto">${k.Descripcion}</p>
    
                               <p class="card-text"><small id="Autor">Autor: ${k.NombreUsuario}</small></p>
                     
                          </div>
    
                          <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="img/list.png">
                       </div>
     
                    </div>
     
                </div>
              ` );
               listas ++;
            });
        }
        else{
            console.log("Error");
        }
    }
    req.send();
    
}

function buscarUsu(){

    let busca = document.getElementById("buscar").value;
    let nombre= busca;
   // let nombre = document.getElementById("buscar").value;

    $("#Listas").empty();
    //var IDautor = localStorage.getItem("AUtorVerLista");

    var req2 = new XMLHttpRequest();
    req2.open("GET",`http://localhost:8888/verListaUsuarioP/${nombre}`, true);
    req2.onreadystatechange = function (data) {
        if (req2.readyState == 4 && req2.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);

            let listas = 1;
            parse[0].forEach((k, v) => {
                if(k.PrivPub.data[0] == 1)
                {
                   var pop = "Publico";
                }
                else{
                    var pop = "Privado";
                }
                $("#Listas" ).prepend(`
                <div class="Fila row">

                <div class="Columnaizquierda col-md-12">
 
                   <div class="Cartacontenedor card text-white bg-dark flex-md-row mb-4 shadow-sm h-md-250">

                      <div class="Cartacuerpo card-body d-flex flex-column align-items-start">

                         <strong class="d-inline-block mb-2 text-white">Lista</strong>

                         <h4 class="mb-0">
                           <a class="TituloCarta text-white" href="#" id="verLista${listas}">${k.NombreLista}</a> 
                         </h4>

                         <p class="DesCarta card-text mb-auto">${k.Descripcion}</p>

                           <p class="card-text"><small id="Autor">Estado: ${pop}</small></p>
                 
                      </div>

                      <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="img/usu.png">
                   </div>
 
                </div>
 
            </div>
                `)
                listas ++;
            });
        }
        else{
            console.log("Error");
        }
    }
    req2.send();   
}

function buscarAC(){
   
    let busca = "Accesorios"
    $("#Listas").empty();
   
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/busqueda/${busca}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let listas = 1;
            parse[0].forEach((k, v) => {
                
                    $( "#Listas" ).prepend( `
                    <div class="Fila row">

                    <div class="Columnaizquierda col-md-12">
     
                       <div class="Cartacontenedor card text-white bg-dark flex-md-row mb-4 shadow-sm h-md-250">
    
                          <div class="Cartacuerpo card-body d-flex flex-column align-items-start">
    
                             <strong class="d-inline-block mb-2 text-white">Lista</strong>
    
                             <h4 class="mb-0">
                               <a class="TituloCarta text-white" href="#" id="verLista${listas}">${k.NombreLista}</a> 
                             </h4>
    
                             <p class="DesCarta card-text mb-auto">${k.Descripcion}</p>
    
                               <p class="card-text"><small id="Autor">Autor: ${k.NombreUsuario}</small></p>
                     
                          </div>
    
                          <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="img/acc.png">
                       </div>
     
                    </div>
     
                </div>
              ` );
               listas ++;
            });
        }
        else{
            console.log("Error");
        }
    }
    req.send();
    
}

function buscarPE(){
   
    let busca = "Prendas"
    $("#Listas").empty();
   
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/busqueda/${busca}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let listas = 1;
            parse[0].forEach((k, v) => {
                
                    $( "#Listas" ).prepend( `
                    <div class="Fila row">

                    <div class="Columnaizquierda col-md-12">
     
                       <div class="Cartacontenedor card text-white bg-dark flex-md-row mb-4 shadow-sm h-md-250">
    
                          <div class="Cartacuerpo card-body d-flex flex-column align-items-start">
    
                             <strong class="d-inline-block mb-2 text-white">Lista</strong>
    
                             <h4 class="mb-0">
                               <a class="TituloCarta text-white" href="#" id="verLista${listas}">${k.NombreLista}</a> 
                             </h4>
    
                             <p class="DesCarta card-text mb-auto">${k.Descripcion}</p>
    
                               <p class="card-text"><small id="Autor">Autor: ${k.NombreUsuario}</small></p>
                     
                          </div>
    
                          <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="img/clothes.png">
                       </div>
     
                    </div>
     
                </div>
              ` );
               listas ++;
            });
        }
        else{
            console.log("Error");
        }
    }
    req.send();
    
}

function buscarZP(){
   
    let busca = "Zapatos"
    $("#Listas").empty();
   
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/busqueda/${busca}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            let listas = 1;
            parse[0].forEach((k, v) => {
                
                    $( "#Listas" ).prepend( `
                    <div class="Fila row">

                    <div class="Columnaizquierda col-md-12">
     
                       <div class="Cartacontenedor card text-white bg-dark flex-md-row mb-4 shadow-sm h-md-250">
    
                          <div class="Cartacuerpo card-body d-flex flex-column align-items-start">
    
                             <strong class="d-inline-block mb-2 text-white">Lista</strong>
    
                             <h4 class="mb-0">
                               <a class="TituloCarta text-white" href="#" id="verLista${listas}">${k.NombreLista}</a> 
                             </h4>
    
                             <p class="DesCarta card-text mb-auto">${k.Descripcion}</p>
    
                               <p class="card-text"><small id="Autor">Autor: ${k.NombreUsuario}</small></p>
                     
                          </div>
    
                          <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="img/shoe.png">
                       </div>
     
                    </div>
     
                </div>
              ` );
               listas ++;
            });
        }
        else{
            console.log("Error");
        }
    }
    req.send();
    
}

$(document).click(function(event) {
    var text = $(event.target).text();
    localStorage.setItem("nombreLista", text);
  });
  
  $("#Listas").on("click", "a", function (event) {
   window.location.href='MostrarLista.html';
  });


function fetch(){
    
    
    //localStorage.setItem("ID",k.IdUsuario);
    

    var botini=document.getElementById("btninicio");
    if(botini){
        localStorage.setItem("ini",1);
    }


    var aver= localStorage.getItem("ini");

    //if(aver==1){

    var button = document.getElementById("buscarListas");
    if(button){
        localStorage.setItem("ini",0);
        button.addEventListener("click",buscarL, false );
    }
    
    var button2 = document.getElementById("buscarUsuario");
    if(button2){
        localStorage.setItem("ini",0);
        button2.addEventListener("click",buscarUsu, false );
    }

    var PS = document.getElementById("AC");
    if(PS){
        localStorage.setItem("ini",0);
        PS.addEventListener("click",buscarAC, false );
    }
    var XB = document.getElementById("PE");
    if(XB){
        localStorage.setItem("ini",0);
        XB.addEventListener("click",buscarPE, false );
    }
    var NI = document.getElementById("ZP");
    if(NI){
        localStorage.setItem("ini",0);
        NI.addEventListener("click",buscarZP, false );
    }
    //}

   
    var ID = localStorage.getItem("ID");
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/user/${ID}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            
            parse.forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
               // document.getElementById("usuario").innerHTML = k.NombreUsuario;
                
            });
        }
        else{
            console.log("Error");
        }
    }
    req.send();

    
    
};

window.onload = fetch();
