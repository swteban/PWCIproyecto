var cantListas=1;


$("[name ='mas']").click(function(){
    cantListas++;
    $("#listasElemento").append(`	<div id="lista${cantListas}">
    <div class="form-group" >
            <h3>Elemento ${cantListas}</h3>
            <label for="exampleFormControlInput1">Titulo</label>
            <br>	
            <input class="form-control" type="text" id="pin${cantListas}" name="pin" maxlength="	100" size="100">
    </div><br>
    <div class="form-group">
        <label for="exampleFormControlSelect1">Descripción</label>
        <br>
        <textarea class="form-control" name="message" rows="10" cols="100" id="desc${cantListas}"></textarea>
        
    </div>
    
    <hr>
    </div> `)
});

$("[name ='menos']").click(function(){
    if(cantListas > 1)
    {
        $(`div#lista${cantListas}`).remove();
        cantListas--;
    }

    
});

$("#btnCrea").click(async function(){
    var secciones = 0;
    

    var accesorios=0;
    var prendas=0;
    var zapatos=0;

    //Accesorios, prendas, zapatos

    
    var accesoriosYA=false;
    var prendasYA=false;
    var zapatosYA=false;

    var GuardarTodo = false;

    if (document.getElementById("ac").checked)
    {
       accesorios = 1;
       secciones++;
    }
    if (document.getElementById("pe").checked)
    {
       prendas = 2;
       secciones++
    }
    if (document.getElementById("zp").checked)
    {
        zapatos = 3;
        secciones++;
    }
   

    var tituloL = document.getElementById("TituloLista").value;
    var PoP = document.getElementsByName('optradio');
    if(tituloL=="")
    {
        alert("No introdujiste nada");
    }else{
        //aqui poner lo demas
    }
    
    for (var i = 0, length = PoP.length; i < length; i++) {
      if (PoP[i].checked) {
        PoP= PoP[i].value;
        break;
      }
    }
    var ID = localStorage.getItem("ID");
    var desc = document.getElementById("descripcion").value;

    if(desc==""){
        alert("No pusiste una descripcion");
    }
    else{
        //poner los demas
    }

   await new Promise(resolve=>{
       
        var req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8888/agregarLista", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(
        JSON.stringify({
            _NombreLista: tituloL,
            _PrivPub: PoP,
            _Autor: ID,
            _Descripcion: desc
        })
        );
        req.onload = function(){
            resolve()
        }
        
    })

    var req3 = new XMLHttpRequest();
    req3.open("GET",`http://localhost:8888/IdLista/${tituloL}`, true);
    req3.onreadystatechange = function (data) {
        if (req3.readyState == 4 && req3.status == 200) {
            var datos = data.target.response;
            console.log(datos);
            var parse = JSON.parse(datos);
            
            parse[0].forEach((k, v) => {
                console.log(`${k.IdLista}`);

                for( var i = 0; i< secciones; i++)
                {
                    if(accesorios == 1 && accesoriosYA == false)
                    {
                        var req2 = new XMLHttpRequest();
                        req2.open("POST", "http://localhost:8888/agregarSeccionLista", true);
                    
                         req2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                         
                         req2.send(
                           JSON.stringify({
                            idS: accesorios,
                            idL: k.IdLista
                             })
                            );
                        accesoriosYA = true;
                    }
                    if(prendas == 2 && prendasYA == false)
                    {
                        var req2 = new XMLHttpRequest();
                        req2.open("POST", "http://localhost:8888/agregarSeccionLista", true);
                         req2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                         req2.send(
                           JSON.stringify({
                            idS: prendas,
                            idL: k.IdLista
                             })
                            );
                        prendasYA = true;
                    }
                    if(zapatos == 3 && zapatosYA == false)
                    {
                        var req2 = new XMLHttpRequest();
                        req2.open("POST", "http://localhost:8888/agregarSeccionLista", true);
                         req2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                         req2.send(
                           JSON.stringify({
                            idS: zapatos,
                            idL: k.IdLista
                             })
                            );
                        zapatosYA = true;
                    }
                   
                 
                       
                    
                }

                for(var ll = 0; ll < cantListas; ll++)
                 {
                     var tituliElemento = document.getElementById(`pin${ll + 1}`).value;
                     var descElemento = document.getElementById(`desc${ll+1}`).value;
                     if(tituliElemento==""){
                         alert("Te falto el titulo del elemento"+ (ll+1));
                     }else{
                         
                     }
                     var req5 = new XMLHttpRequest();
                     req5.open("POST", "http://localhost:8888/agregarElemento", true);
                      req5.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                      req5.send(
                        JSON.stringify({
                         _titulo: tituliElemento,
                         _Descripcion: descElemento,
                         _IdLista: k.IdLista
                          })
                        );
                }

                GuardarTodo = true;

            });
        }
        else{
            console.log("Si ");
        }
    }
    req3.send();

    alert("Lista creada");
     //window.location = 'Perfil.html';
    
   
})


function fetch()
{
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
                document.getElementById("usuario").innerHTML = k.NombreUsuario;
                
            });
        }
        else{
            console.log("hola");
        }
    }
    req0.send();

    
}

window.onload = fetch();