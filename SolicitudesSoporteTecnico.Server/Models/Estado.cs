using System.ComponentModel.DataAnnotations;

namespace SolicitudesSoporteTecnico.Server.Models
{
    public class Estado
    {
        [Key]
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
        public bool Activo { get; set; }
    }
}
