using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Comentario
    {

        [Key]
        public int? IdComentario { get; set; }
        [Required,MaxLength(50)]
        public string DetalleComentario { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int IdSolicitud {  get; set; }
        public bool Activo { get; set; }
    }
}
