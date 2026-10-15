using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolicitudesSoporteTecnico.Server.Models;
using SolicitudesSoporteTecnico.Server.Servicios;

namespace SolicitudesSoporteTecnico.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SolicitudesController : Controller
    {
        private readonly ISolicitudesService _service;
        public SolicitudesController(ISolicitudesService service)
        {
            _service = service;
        }


        [HttpGet("getcategorias")]
        public async Task<IEnumerable<Categoria>> GetCategorias()
        {
            return await _service.ObtenerCategorias();
            
        }

        [HttpGet("obtenerestados")]
        public async Task<IEnumerable<Estado>> ObtenerEstados()
        {
            return await _service.ObtenerEstados();

        }
        [HttpGet("obtenerprioridades")]
        public async Task<IEnumerable<Prioridad>> ObtenerPrioridades()
        {
            return await _service.ObtenerPrioridades();

        }
        [HttpGet("obtenersolicitudes/{pagina}/{paginaSize}")]
        public async Task<IEnumerable<ListaSolicitudes>> ObtenerSolicitudes([FromRoute] int pagina, int paginaSize)
        {
                                  
             return await  _service.ObtenerListaSolicitudes(pagina, paginaSize);
            
        }

        [HttpPost("guardarsolicitud")]
        public async Task<ActionResult> GuardarSolicitud([FromBody] Solicitud solicitud)
        {
            await _service.GuardarSolicitud(solicitud);
            return Ok();
        }
        [HttpPost("guardarcomentario")]
       public async Task<ActionResult> GuardarComentario([FromBody] Comentario comentario) 
        {
            await _service.GuardarComentario(comentario);
            return Ok();
        }
        [HttpPost("actualizarestado")]
        public async Task<ActionResult> ActualizarEstado(ActualizarEstado estado) 
        {
            await _service.ActualizarEstado(estado);
            return Ok();
        }
    }
}
