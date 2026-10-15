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

        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Prioridad> Prioridad { get; set; }
        public DbSet<Solicitud> Solicitud { get; set; }
        public DbSet<Estado> Estado { get; set; }
        public DbSet<Comentario> Comentario { get; set; }

        public DbSet<ListaSolicitudes> SolicitudesView =>
         Set<ListaSolicitudes>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ListaSolicitudes>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("vw_ListaSolicitudes", "dbo");
            });
        }

    }
}
