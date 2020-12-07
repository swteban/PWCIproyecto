const express = require('express')
const app = express()
const port = 8888
var mysql = require("mysql");
var cors = require("cors");
app.use(express.json());
app.use(cors());


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "StyleCollective",
});

connection.connect();

app.get("/user", (req, res) => {
  connection.query(
    'call LogIn()',
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


///////////////////////////---------CREAR CUENTA--------------/////////////////////////////////////////////////////////////////

app.post("/user", (req, res) => {
  connection.query(
    `insert Usuario(Correo, NombreUsuario, Contraseña, PoP,Foto) values ('${req.body.Correo}','${req.body.NombreUsuario}','${req.body.Contraseña}', ${req.body.PoP},${req.body.Foto});`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

///////////////////////////----------INICIO----------------////////////////////////////////////////////////////////////

app.get("/user/:id", (req, res) => {
  connection.query(
    `SELECT IdUsuario,
        Correo,
        NombreUsuario,
        Contraseña,
        PoP,
        Foto
        FROM Usuario
        where IdUsuario = ${req.params.id}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/listas", (req, res) => {
  connection.query(
    `    select NombreLista, PrivPub, Descripcion, u.NombreUsuario  from Listas l 
    inner join Usuario u on l.Autor = u.IdUsuario where u.PoP = 1 and l.PrivPub = 1 order by l.IdLista;`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/busqueda/:busca", (req, res) => {
  connection.query(
    `call BuscarPorSeccion("${req.params.busca}")`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/busquedanombre/:busca", (req, res) => {
  connection.query(
    `call BuscarPorNombre("${req.params.busca}")`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


/////////////////////----------------CrearCuenta----------------//////////////////////////////////////


app.post("/editar", (req, res) => {
  connection.query(
    `UPDATE usuario SET Correo= '${req.body.Correo}', NombreUsuario = '${req.body.NombreUsuario}', Contraseña= '${req.body.Contraseña}', 
    PoP = ${req.body.PoP}, Foto=${req.body.Foto} WHERE IdUsuario = ${req.body.IdUsuario}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//aqui la de editars

app.post("/updatear", (req, res) => {
  connection.query(
    `UPDATE Listas SET NombreLista= '${req.body.NombreLista}', PrivPub = ${req.body.PrivPub}, 
    Descripcion = '${req.body.Descripcion}' WHERE IdLista = ${req.body.IdLista}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//aqui la de eliminars 

app.post("/eliminar/:idlist", (req, res) => {
  connection.query(
    `call EliminarLista(${req.params.idlist});`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

///////////////////----------------VER LISTAS-----------------//////////////////////////////////


app.get("/verLista/:nombre", (req, res) => {
  connection.query(
    `call VerLista("${req.params.nombre}");`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


/////////////////////////----------Pagina Perfil--------------//////////////////////////////////

app.get("/verListaUsuario/:id", (req, res) => {
  connection.query(
    `call ListasUsuario("${req.params.id}");`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//////////////////////----------autorLista------------------///////////////////////////

app.get("/verAutorLista/:nombre", (req, res) => {
  connection.query(
    `call AutorDeLista("${req.params.nombre}");`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


app.get("/verListaUsuarioP/:nombre", (req, res) => {
  connection.query(
    `call ListasUsuarioP("${req.params.nombre}");`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


//////////////////////////--------Crear Listas-------------///////////////////////////////////

app.get("/Secciones", (req, res) => {
  connection.query(
    `call Secciones()`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.post("/agregarLista", (req, res) => {
  connection.query(
    `call AgregaLista('${req.body._NombreLista}', ${req.body._PrivPub}, ${req.body._Autor}, '${req.body._Descripcion}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/IdLista/:_NombreLista", (req, res) => {
  connection.query(
    `call IdListaAutor ('${req.params._NombreLista}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.post("/agregarSeccionLista", (req, res) => {
  connection.query(
    `call agregarSeccion(${req.body.idS}, ${req.body.idL})`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});


app.post("/agregarElemento", (req, res) => {
  connection.query(
    `call agregarElemento('${req.body._titulo}', '${req.body._Descripcion}', ${req.body._IdLista})`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});