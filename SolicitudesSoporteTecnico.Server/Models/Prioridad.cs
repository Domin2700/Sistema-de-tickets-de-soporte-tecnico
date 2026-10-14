using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Prioridad
    {
        [Key]
        public int IdPrioridad { get; set; }
        public string NombrePrioridad { get; set; }
        public bool Activo { get; set; }
    }
}
