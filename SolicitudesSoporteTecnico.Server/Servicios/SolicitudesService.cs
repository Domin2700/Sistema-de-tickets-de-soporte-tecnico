using Microsoft.EntityFrameworkCore;
using SolicitudesSoporteTecnico.Server.Context;
using SolicitudesSoporteTecnico.Server.Models;
using System;


namespace SolicitudesSoporteTecnico.Server.Servicios
{
    public class SolicitudesService: ISolicitudesService
    {
        private readonly SoporteDbContext _context;


        public SolicitudesService( SoporteDbContext context)
        {
        
            _context = context;
        }


        public async Task<IEnumerable<Categoria>> ObtenerCategorias() 
        {
            try
            {
                return await _context.Categoria.Where(e => e.Activo == true).ToListAsync();

            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<IEnumerable<Prioridad>> ObtenerPrioridades()
        {
            try
            {
                return await _context.Prioridad.Where(e => e.Activo == true).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        public async Task<IEnumerable<Estado>> ObtenerEstados()
        {
            try
            {
                return await _context.Estado.Where(e => e.Activo == true).ToListAsync();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IEnumerable<ListaSolicitudes>> ObtenerListaSolicitudes(int pagina, int paginaSize)  
        {
            try 
            {

            pagina = Math.Max(1, pagina);
            paginaSize = Math.Clamp(paginaSize, 1, 100);

            // 1. Obtener solicitudes desde la vista
            var solicitudes = await _context.SolicitudesView
                .AsNoTracking()
                .Where(s => s.Activo == true)
                .OrderByDescending(s => s.IdSolicitud)
                .Skip((pagina - 1) * paginaSize)
                .Take(paginaSize)
                .Select(s => new ListaSolicitudes
                {
                    IdSolicitud = s.IdSolicitud,
                    NombreSolicitante = s.NombreSolicitante,
                    Correo = s.Correo,
                    Asunto = s.Asunto,
                    Descripcion = s.Descripcion,
                    NombreCategoria = s.NombreCategoria,
                    NombrePrioridad = s.NombrePrioridad,
                    NombreEstado = s.NombreEstado,
                    IdEstado = s.IdEstado,
                    FechaCreacion = s.FechaCreacion,
                    CodigoSolicitud = s.CodigoSolicitud,
                    Resolucion = s.Resolucion,
                    Activo = s.Activo,

                    // Inicializar la sublista
                    Comentarios = new List<Comentario>()
                })
                .ToListAsync();

            if (solicitudes.Count == 0)
                return solicitudes;

            // 2. Obtener los IDs de las solicitudes
            var idsSolicitudes = solicitudes
                .Where(s => s.IdSolicitud.HasValue)
                .Select(s => s.IdSolicitud!.Value)
                .ToList();

            // 3. Consultar la tabla Comentario para esos IDs
            var comentarios = await _context.Comentario
                .AsNoTracking()
                .Where(c => idsSolicitudes.Contains(c.IdSolicitud))
                .ToListAsync();

            // 4. Agrupar y asignar los comentarios a cada solicitud
            var comentariosPorSolicitud = comentarios
                .GroupBy(c => c.IdSolicitud)
                .ToDictionary(g => g.Key, g => g.ToList());

            foreach (var solicitud in solicitudes)
            {
                if (solicitud.IdSolicitud.HasValue &&
                    comentariosPorSolicitud.TryGetValue(
                        solicitud.IdSolicitud.Value, out var listaComentarios))
                {
                    solicitud.Comentarios = listaComentarios;
                }
            }

            return solicitudes;
        }


    
            catch (Exception)
            {

                throw;
            }
        }

        public async Task  GuardarSolicitud(Solicitud solicitud) 
        {
            try
            {
                await _context.Solicitud.AddAsync(solicitud);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

       public async Task GuardarComentario(Comentario comentario)
       {
            try
            {
                await _context.Comentario.AddAsync(comentario);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
       }
       public async Task ActualizarEstado(ActualizarEstado estado)
       {
            try
            {

                var Solicitud = new Solicitud
                {
                    IdSolicitud = estado.IdSolicitud,
                    IdEstado = estado.IdEstado,
                    Resolucion = estado.Resolucion,
                };
                _context.Solicitud.Attach(Solicitud);
                _context.Entry(Solicitud).Property(x => x.IdEstado).IsModified = true;
                _context.Entry(Solicitud).Property(x => x.Resolucion).IsModified = true;
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
       }

    }
}
