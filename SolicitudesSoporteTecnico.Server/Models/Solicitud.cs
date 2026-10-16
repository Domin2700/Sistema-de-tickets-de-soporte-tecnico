using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Solicitud
    {
        [Key]
        public int? IdSolicitud {  get; set; }   
        [Required,MaxLength(100)]
        public string NombreSolicitante { get; set; }
        [Required,MaxLength(100)]
        public string Correo {  get; set; } 
        [Required,MaxLength(500)]
        public string Asunto { get; set; }
        [Required,MaxLength(500)]
        public string Descripcion { get; set; } 
        [Required]
        public int IdCategoria { get; set; }
        [Required]
        public int IdPrioridad { get; set; }
        public int? IdEstado { get; set; }
       // public DateTime FechaCreacion { get; set; }
        public string? Resolucion { get; set; }
       // public bool?  Activo { get; set; }
    }
}
