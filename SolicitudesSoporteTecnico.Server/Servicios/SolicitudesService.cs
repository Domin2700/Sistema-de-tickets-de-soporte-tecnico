using SolicitudesSoporteTecnico.Server.Models;


namespace SolicitudesSoporteTecnico.Server.Servicios
{
    public class SolicitudesService: ISolicitudesService
    {

        public async Task<IEnumerable<Categoria>> ObtenerCategorias() 
        {  
            return Enumerable.Empty<Categoria>(); 
        }

        public async Task<IEnumerable<Prioridad>> ObtenerPrioridades()
        { return Enumerable.Empty<Prioridad>();}

        public async Task<IEnumerable<Estado>> ObtenerEstados()
        { return Enumerable.Empty<Estado>(); }

        public async Task<IEnumerable<ListaSolicitudes>> ObtenerListaSolicitudes()
            { return Enumerable.Empty<ListaSolicitudes>();}

        public async Task  GuardarSolicitud(Solicitud solicitud) 
        {
          
        }

    }
}
