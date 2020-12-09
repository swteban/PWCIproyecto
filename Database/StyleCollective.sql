CREATE DATABASE  IF NOT EXISTS `StyleCollective`;
USE `StyleCollective`;

/*<---------------------------------- T A B L A S ----------------------------------------->*/

Create table if not exists Usuario(
IdUsuario int unsigned not null auto_increment  primary key,
Correo varchar(50) not null UNIQUE,
NombreUsuario varchar(50) not null UNIQUE,
Contraseña varchar(20) not null,
Foto int,
PoP bit default 1
);

insert Usuario(Correo, NombreUsuario, Contraseña) values ('samhirashi@gmail.com','Sam','123');

Create table if not exists Listas(
IdLista int unsigned not null auto_increment  primary key,
NombreLista varchar(30) not null,
PrivPub bit default(1),
Autor int unsigned,
Descripcion text not null,
constraint FK_Lista_Usuario foreign key (Autor) references Usuario(IdUsuario)
);

select * from Listas;
update Listas set NombreLista="Cosas" where IdLista = 56;
insert into Listas set NombreLista = 'Wishlist', PrivPub = 1, Autor = 1, Descripcion = 'Cosas que quiero comprar';
insert into Listas set NombreLista = 'Atuendos', PrivPub = 1, Autor = 1, Descripcion = 'Artículos que tengo en casa';
insert into Listas set NombreLista = 'Accesorios', PrivPub = 1, Autor = 1, Descripcion = 'Accesorios que me gustaría obtener';



Create table if not exists Secciones(
IdSeccion int unsigned not null auto_increment  primary key,
Nombre enum('Accesorios','Prendas','Zapatos')
);


Create table if not exists Lista_Seccion(
IdLS int unsigned not null auto_increment  primary key,
IdSeccion int unsigned,
IdLista int unsigned,
constraint FK_Seccion_TR foreign key (IdSeccion) references Secciones(IdSeccion),
constraint FK_Lista_TR foreign key (IdLista) references Listas(IdLista)
);

select * from Lista_Seccion;
insert into Lista_Seccion set IdSeccion = 1, IdLista = 24;
insert into Lista_Seccion set IdSeccion = 3, IdLista = 23;
insert into Lista_Seccion set IdSeccion = 2, IdLista = 27;



Create table if not exists ElementoLista(
IdElementosListas int unsigned not null auto_increment  primary key,
Titulo varchar(30) not null,
Descripcion text,
Imagen blob,
info int,
IdLista int unsigned,
constraint FK_ElementoL_Listas foreign key (IdLista) references Listas(IdLista)
);



select * from ElementoLista;
insert into ElementoLista set Titulo = 'Aretes Negros', Descripcion = 'Unos Aretes Negros', IdLista = 22;
insert into ElementoLista set Titulo = 'Brazalete de Oro', Descripcion = 'Un Brazalete de Oro blanco', IdLista = 22;
insert into ElementoLista set Titulo = 'Collar de Plata', Descripcion = 'Un Collar de Plata', IdLista = 22;
insert into ElementoLista set Titulo = 'Reloj', Descripcion = 'Un Reloj Azul', IdLista = 22;

insert into ElementoLista set Titulo = 'Chaqueta de Piel', Descripcion = 'Una Chaqueta de Piel', IdLista = 24;

/*<---------------------------------- S T O R E D P R O C E D U R E S ----------------------------------------->*/

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



drop procedure VerLista;
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


DELIMITER //
CREATE PROCEDURE IdListaAutor(in _NombreLista varchar(50))
BEGIN
select IdLista from Listas where NombreLista = _NombreLista;
END 
//
DELIMITER ;



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

drop procedure agregarElemento;

