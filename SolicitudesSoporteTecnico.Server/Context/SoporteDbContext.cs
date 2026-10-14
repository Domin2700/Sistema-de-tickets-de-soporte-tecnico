using Microsoft.EntityFrameworkCore;
using SolicitudesSoporteTecnico.Server.Models;

namespace SolicitudesSoporteTecnico.Server.Context
{
    public class SoporteDbContext: DbContext
    {
        public SoporteDbContext(DbContextOptions<SoporteDbContext> options)
        :base(options)
        {

        }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Prioridad> Prioridads { get; set; }
        public DbSet<Solicitud> Solicituds { get; set; }


    }
}
