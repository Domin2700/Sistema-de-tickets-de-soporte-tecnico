using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class ListaSolicitudes
    {
        
        public int? IdSolicitud { get; set; }
        public string NombreSolicitante { get; set; }
        public string Correo { get; set; }
        public string Asunto { get; set; }
        public string Descripcion { get; set; }
        public string NombreCategoria { get; set; }
        public string NombrePrioridad { get; set; }
        public string NombreEstado { get; set; }
        public int IdPrioridad { get; set; }
        public int IdCategoria { get; set; }

        public int IdEstado {  get; set; }
        public DateTime FechaCreacion { get; set; }
        public string? CodigoSolicitud { get; set; }
      
        public string? Resolucion { get; set; }
        public virtual ICollection<Comentario> Comentarios { get; set; }

        public bool? Activo { get; set; }
    }
}
