using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Categoria
    {
        [Key]
        public int IdCategoria { get; set; }
        [Required,MaxLength(30)]
        public string NombreCategoria { get; set; }
        public bool Activo { get; set; }
    }
}
