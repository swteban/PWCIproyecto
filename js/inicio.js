
$(document).click(function(event) {
  var text = $(event.target).text();
  localStorage.setItem("nombreLista", text);
});

$("#Listas").on("click", "a", function (event) {
 window.location.href='MostrarLista.html';
});


function fetch(){
    
  
    localStorage.setItem("ini",1);

    var aver= localStorage.getItem("ini");

    if(aver!=0){
    
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
            console.log("hola");
        }
    }
    req.send();

    var req2 = new XMLHttpRequest();
    req2.open("GET",`http://localhost:8888/listas`, true);
    req2.onreadystatechange = function (data) {
        if (req2.readyState == 4 && req2.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            var valor = parse.length;
            let listas = 1;
            parse.forEach((k, v) => {
                if(valor <= 5){
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
    
                          <img class="imagencarta card-img-right flex-auto d-none d-lg-block" alt="imagenlista" src="https://www.visionplanet.com.ar/wp-content/uploads/2019/10/Prune.jpg">
                       </div>
     
                    </div>
     
                </div>
    
                    
                    ` );

              listas++;
                }
                else{
                    valor --;
                }
                
                
                
            });
        }
        else{
            console.log("hola");
        }
    }
    req2.send();
  
    }
};

window.onload = fetch();