using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Solicitud
    {
        [Key]
        public int? IdSolicitud {  get; set; }   
        [Required,MaxLength(50)]
        public string NombreSolicitante { get; set; }
        [Required,MaxLength(50)]
        public string Correo {  get; set; } 
        [Required,MaxLength(50)]
        public string Asunto { get; set; }
        [Required,MaxLength(50)]
        public string Descripcion { get; set; } 
        [Required]
        public int IdCategoria { get; set; }
        [Required]
        public int IdPrioridad { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string?  CodigoSolicitud { get; set; }
        public string? Comentario { get; set; }
        public string? Resolucion { get; set; }
        public bool?  Activo { get; set; }
    }
}
