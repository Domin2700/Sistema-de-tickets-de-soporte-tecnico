using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Prioridad
    {
        [Key]
        public int IdPrioridad { get; set; }
        [Required, MaxLength(30)]
        public string NombrePrioridad { get; set; }
        public bool Activo { get; set; }
    }
}
