function fetch(){

    localStorage.setItem("ini",0);
    localStorage.setItem("perfi",1);
    var ID = localStorage.getItem("ID");
    var req0 = new XMLHttpRequest();
    req0.open("GET",`http://localhost:8888/user/${ID}`, true);
    req0.onreadystatechange = function (data) {
        if (req0.readyState == 4 && req0.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            
            parse.forEach((k, v) => {
                console.log(`${k.NombreUsuario}`);
                console.log(`${v}`);
                //document.getElementById("usuario").innerHTML = k.NombreUsuario;
                
            });
        }
        else{
            console.log("hola");
        }
    }
    req0.send();

    var NL = localStorage.getItem("nombreLista");
    var req = new XMLHttpRequest();
    req.open("GET",`http://localhost:8888/verLista/${NL}`, true);
    req.onreadystatechange = function (data) {
        if (req.readyState == 4 && req.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            
            parse[0].forEach((k, v) => {
                console.log(`${k.Titulo}`);
                console.log(`${k.DescripcionLista}`);
                console.log(`${k.Correo}`);
                console.log(`${k.NombreUsuario}`);
             //   console.log(`${k.PoP}`);
             //   console.log(`${k.PoP}`);
                document.getElementById("Lnombre").innerHTML = "Autor: "+k.NombreUsuario + " | ";
                document.getElementById("Lcorreo").innerHTML = k.Correo + " | ";
               // if(k.PoP.data[0] == 1)
                //{
                  //  document.getElementById("Lpop").innerHTML = "Publico";
                //}
                //else{
                  //  document.getElementById("Lpop").innerHTML = "Privado";
                //}
                document.getElementById('tituloLista').innerHTML = k.NombreLista;

                $( "#Elementos" ).append( `
                <div class="Parteobj row">
                <div class="Columnadeobjeto col-lg-10">
                    <h3 class="TituloOBJT border-bottom" id="titu" >${k.Titulo}</h3>
                   
                    <div id="descripcionObj">
                        <br>
                        <article>
                            <p> ${k.DescripcionLista} </p>
                        </article>
                        <br>
                    </div>
                </div>
            </div>
                ` );
            });
        }
        else{
            console.log("hola");
        }
    }
    req.send();
   
};

$(document).click(function(event) {
    var text = $(event.target).text();
    localStorage.setItem("AutorVer", text);
  });

  $("#VL").click(function(){
    window.location.href='ResultadoBusqueda.html';
  });

window.onload = fetch();