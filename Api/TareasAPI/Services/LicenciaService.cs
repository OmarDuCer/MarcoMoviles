using TAREASAPI.Models;
namespace TAREASAPI.Services;

public class LicenciaService : ILicenciaService
{
    private readonly Licencia _licencias = new Licencia
    {
        IdLicencia = "FQ-000112",
        Nombre = "Bob Esponja Pantalones Cuadrados",
        FechaNacimiento = "14/07/1986",
        FechaExpiracion = "14/07/2030",
        TipoLicencia = "Clase B",
        Direccion = "Piña 124, Fondo de Bikini",
        Estado = true,
    };

    public Licencia ObtenerLicencia()
    {
        return _licencias;
    }
}