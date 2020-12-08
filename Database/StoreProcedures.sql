USE `StyleCollective`;

DELIMITER //
CREATE PROCEDURE LogIn()
BEGIN
SELECT IdUsuario,
        Correo,
        NombreUsuario,
        Contraseña
        FROM Usuario;
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE BuscarPorSeccion(in busqueda varchar(20))
BEGIN
select NombreLista, PrivPub, Descripcion, u.NombreUsuario, s.Nombre from Listas l 
inner join Usuario u on l.Autor = u.IdUsuario
inner join Lista_Seccion ls on ls.IdLista = l.IdLista 
inner join Secciones s on ls.IdSeccion = s.IdSeccion
where  s.Nombre like concat(concat('%',busqueda),'%') and u.PoP = 1 and l.PrivPub = 1;
END 
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE BuscarPorNombre(in busqueda varchar(20))
BEGIN
select NombreLista, PrivPub, Descripcion, u.NombreUsuario, s.Nombre from Listas l 
inner join Usuario u on l.Autor = u.IdUsuario
inner join Lista_Seccion ls on ls.IdLista = l.IdLista 
inner join Secciones s on ls.IdSeccion = s.IdSeccion
where  l.NombreLista like concat(concat('%',busqueda),'%') and u.PoP = 1 and l.PrivPub = 1;
END 
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarLista(in idListi int)
BEGIN
delete from ElementoLista where IdLista = idListi;
delete from Lista_Seccion where IdLista = idListi;
delete from Listas where IdLista = idListi;
END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE VerLista(in nombreL varchar(20))
BEGIN
select el.Titulo, el.Descripcion as DescripcionLista, u.Correo, u.NombreUsuario, u.PoP, l.NombreLista from ElementoLista el
inner join Listas l on l.IdLista = el.IdLista
inner join Usuario u on u.IdUsuario = l.Autor
where NombreLista = nombreL;
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE ListasUsuario(in _Autor int)
BEGIN
select NombreLista, PrivPub, Descripcion, IdLista from Listas l inner join Usuario u on u.IdUsuario = l.Autor where Autor  = _Autor; 
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE AutorDeLista(in _Autor varchar(20))
BEGIN
select IdUsuario,
        Correo,
        NombreUsuario, PoP from Usuario where NombreUsuario = _Autor;
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE ListasUsuarioP(in _Autor varchar(20))
BEGIN
select NombreLista, PrivPub, Descripcion from Listas l inner join Usuario u on u.IdUsuario = l.Autor where u.NombreUsuario  = _Autor and l.PrivPub = 1; 
END 
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE Secciones()
BEGIN
select nombre from Secciones;
END 
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AgregaLista(in _NombreLista varchar(50), in _PrivPub int, in _Autor int, in _descripcion text)
BEGIN
insert into Listas set NombreLista = _NombreLista, PrivPub = _PrivPub, Autor = _Autor, Descripcion = _descripcion;
END 
//
DELIMITER ;
 call AgregaLista();



DELIMITER //
CREATE PROCEDURE IdListaAutor(in _NombreLista varchar(50))
BEGIN
select IdLista from Listas where NombreLista = _NombreLista;
END 
//
DELIMITER ;

call IdListaAutor('Sep');


DELIMITER //
CREATE PROCEDURE IdListaAutor(in _NombreLista varchar(50))
BEGIN
select IdLista from Listas where NombreLista = _NombreLista;
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE agregarSeccion(in idS int, in idL int)
BEGIN
insert into Lista_Seccion set IdSeccion = idS, IdLista = idL;
END 
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE agregarElemento(in _titulo varchar(50), in _Descripcion text, in _IdLista int)
BEGIN
insert into ElementoLista set Titulo = _titulo , Descripcion = _Descripcion, IdLista = _IdLista;
END 
//
DELIMITER ;



