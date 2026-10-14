using SolicitudesSoporteTecnico.Server.Models;

namespace SolicitudesSoporteTecnico.Server.Servicios
{
    public interface ISolicitudesService
    {
        Task<IEnumerable<Categoria>> ObtenerCategorias();
        Task<IEnumerable<Prioridad>> ObtenerPrioridades();
        Task<IEnumerable<Estado>> ObtenerEstados();
        Task<IEnumerable<ListaSolicitudes>> ObtenerListaSolicitudes();

        Task GuardarSolicitud(Solicitud solicitud);

    }
}
