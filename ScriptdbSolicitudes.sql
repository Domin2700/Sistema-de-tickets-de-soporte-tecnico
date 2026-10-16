CREATE DATABASE SolicitudesSoporteTecnico
USE SolicitudesSoporteTecnico


CREATE TABLE Categoria(
IdCategoria INT IDENTITY(1,1) PRIMARY KEY,
NombreCategoria NVARCHAR(50) NOT NULL UNIQUE,
Activo BIT NOT NULL DEFAULT 1
);

CREATE TABLE Prioridad (
IdPrioridad  INT IDENTITY(1,1) PRIMARY KEY,
NombrePrioridad NVARCHAR(50) NOT NULL UNIQUE,
Activo Bit NOT NULL DEFAULT 1
);

CREATE TABLE Estado (
IdEstado  INT IDENTITY(1,1) PRIMARY KEY,
NombreEstado NVARCHAR(50) NOT NULL UNIQUE,
Activo Bit NOT NULL DEFAULT 1
);


CREATE TABLE Solicitud (
IdSolicitud INT IDENTITY(1,1) PRIMARY KEY,
NombreSolicitante NVARCHAR(50) NOT NULL,
Correo NVARCHAR(100) NOT NULL,
Asunto NVARCHAR(100) NOT NULL,
Descripcion NVARCHAR(500) NOT NULL,
IdCategoria INT NOT NULL FOREIGN KEY REFERENCES Categoria(IdCategoria),
IdPrioridad INT NOT NULL FOREIGN KEY REFERENCES Prioridad(IdPrioridad),
IdEstado INT NOT NULL FOREIGN KEY REFERENCES Estado(IdEstado),
FechaCreacion DATETIME NOT NULL DEFAULT (GETDATE()),
CodigoSolicitud AS (RIGHT('0000000'+CAST(IdSolicitud AS NVARCHAR(8)),8)) PERSISTED,
Resolucion NVARCHAR(500),
Activo BIT NOT NULL DEFAULT 1
);

CREATE TABLE Comentario (
IdComentario  INT IDENTITY(1,1) PRIMARY KEY,
DetalleComentario NVARCHAR(500),
FechaCreacion DATETIME NOT NULL,
IdSolicitud INT NOT NULL FOREIGN KEY REFERENCES Solicitud(IdSolicitud) DEFAULT 1,
Activo Bit NOT NULL DEFAULT 1
);

CREATE VIEW [dbo].[vw_ListaSolicitudes]
AS
SELECT dbo.Solicitud.*, dbo.Prioridad.NombrePrioridad, dbo.Estado.NombreEstado, dbo.Categoria.NombreCategoria
FROM     dbo.Solicitud INNER JOIN
                  dbo.Prioridad ON dbo.Solicitud.IdPrioridad = dbo.Prioridad.IdPrioridad INNER JOIN
                  dbo.Estado ON dbo.Solicitud.IdEstado = dbo.Estado.IdEstado INNER JOIN
                  dbo.Categoria ON dbo.Solicitud.IdCategoria = dbo.Categoria.IdCategoria
GO