using SolicitudesSoporteTecnico.Server.Models;

namespace SolicitudesSoporteTecnico.Server.Servicios
{
    public interface ISolicitudesService
    {
        Task<IEnumerable<Categoria>> ObtenerCategorias();
        Task<IEnumerable<Prioridad>> ObtenerPrioridades();
        Task<IEnumerable<Estado>> ObtenerEstados();
        Task<IEnumerable<ListaSolicitudes>> ObtenerListaSolicitudes(int pagina, int paginaSize);

        Task GuardarSolicitud(Solicitud solicitud);
        Task GuardarComentario(Comentario comentario);
        Task ActualizarEstado(ActualizarEstado estado);

    }
}
