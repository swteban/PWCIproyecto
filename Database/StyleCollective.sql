CREATE DATABASE  IF NOT EXISTS `StyleCollective`;
USE `StyleCollective`;

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
IdLista int unsigned,
constraint FK_ElementoL_Listas foreign key (IdLista) references Listas(IdLista)
);


insert into ElementoLista set Titulo = 'Aretes Negros', Descripcion = 'Unos Aretes Negros', IdLista = 22;
insert into ElementoLista set Titulo = 'Brazalete de Oro', Descripcion = 'Un Brazalete de Oro blanco', IdLista = 22;
insert into ElementoLista set Titulo = 'Collar de Plata', Descripcion = 'Un Collar de Plata', IdLista = 22;
insert into ElementoLista set Titulo = 'Reloj', Descripcion = 'Un Reloj Azul', IdLista = 22;

insert into ElementoLista set Titulo = 'Chaqueta de Piel', Descripcion = 'Una Chaqueta de Piel', IdLista = 27;

