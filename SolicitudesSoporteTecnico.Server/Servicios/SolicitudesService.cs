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
            try { 
              
            pagina = Math.Max(1, pagina);
            paginaSize = Math.Clamp(paginaSize, 1, 100);

            return (IEnumerable<ListaSolicitudes>) await _context.SolicitudesView
                               .Where(w => w.Activo == true)
                               .SelectMany(s => s.SolicitudComentarios.DefaultIfEmpty(), (s, sc) => new {
                                   s.IdSolicitud,
                                   s.NombreSolicitante,
                                   s.Correo,
                                   s.Asunto,
                                   s.Descripcion,
                                   s.Categoria,
                                   s.Prioridad,
                                   s.Estado,
                                   s.IdEstado,
                                   s.FechaCreacion,
                                   s.CodigoSolicitud,
                                   s.Resolucion,
                                   s.SolicitudComentarios

                               })
                                 .AsNoTracking()
                              .OrderByDescending(s => s.IdSolicitud)
                              .Skip((pagina - 1) * paginaSize)
                              .Take(paginaSize)
                              .ToListAsync();

                
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
