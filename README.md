# Sistema de Gestión de Solicitudes de Soporte

Aplicación web para registrar solicitudes de soporte técnico, consultar su estado y dar seguimiento a la atención mediante comentarios y registro de resolución.

## Descripción

La solución centraliza las solicitudes de soporte de los colaboradores de una organización. Permite registrar cada solicitud, consultar y filtrar el listado, cambiar su estado y conservar un historial de comentarios y resolución.

## Funcionalidades

- **Registrar solicitudes** con:
  - Nombre del solicitante.
  - Correo electrónico.
  - Asunto.
  - Descripción.
  - Categoría: Hardware, Software o Accesos.
  - Prioridad: Baja, Media o Alta.
- **Consultar solicitudes** en un listado.
- **Filtrar solicitudes** por estado, categoría y prioridad.
- **Consultar el detalle** de cada solicitud, incluido su identificador único y fecha de creación.
- **Cambiar el estado** entre Pendiente, En atención y Resuelta.
- **Agregar comentarios de seguimiento**, guardando el texto y la fecha de creación de cada comentario.
- **Registrar la resolución** de una solicitud. El texto de resolución es obligatorio para cambiar su estado a Resuelta.
- Mostrar mensajes de validación, éxito y error en la interfaz.

Toda solicitud nueva se crea automáticamente en estado **Pendiente**. El identificador y la fecha de creación se generan automáticamente.

## Tecnologías

La solución está organizada en frontend, backend y base de datos relacional:

- **Frontend:** Angular y Bootstrap.
- **Backend:** ASP.NET Core Web API.
- **Base de datos:** Microsoft SQL Server.
- **Contenedores:** Docker y Docker Compose.

