namespace SolicitudesSoporteTecnico.Server.Models
{
    public class SolicitudComentario
    {
        public int IdComentario { get; set; }
        public string DetalleComentario { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdSolicitud {  get; set; }
    }
}
