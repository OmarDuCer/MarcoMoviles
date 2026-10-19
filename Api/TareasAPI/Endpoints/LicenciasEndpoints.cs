using TAREASAPI.Models;
using TAREASAPI.Services;

namespace TAREASAPI.Endpoints;

public static class LicenciasEndpoints
{
    public static void MapLicenciaEndpoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/licencias").WithTags("Licencias");

        grupo.MapGet("/", (ILicenciaService service) => Results.Ok(service.ObtenerLicencia()));
    }
}