using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class ListaSolicitudes
    {
        [Key]
        public int? IdSolicitud { get; set; }
        public string NombreSolicitante { get; set; }
        public string Correo { get; set; }
        public string Asunto { get; set; }
        public string Descripcion { get; set; }
        public string Categoria { get; set; }
        public string Prioridad { get; set; }
        public string Estado { get; set; }
        public int IdEstado {  get; set; }
        public DateTime FechaCreacion { get; set; }
        public string? CodigoSolicitud { get; set; }
        public string? Comentario { get; set; }
        public DateTime FechaComentario { get; set; }
        public string? Resolucion { get; set; }
        public bool? Activo { get; set; }
    }
}
