namespace TAREASAPI.Models;

public class Licencia
{
    public required string IdLicencia { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string FechaNacimiento { get; set; } = string.Empty;
    public string FechaExpiracion { get; set; } = string.Empty;
    public string TipoLicencia { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public bool Estado { get; set; } = true;
}