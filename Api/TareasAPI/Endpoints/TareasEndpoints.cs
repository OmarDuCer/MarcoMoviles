using TAREASAPI.Models;
using TAREASAPI.Services;

namespace TAREASAPI.Endpoints;

public static class TareasEndpoints
{
    public static void MapTareaEndpoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/tareas").WithTags("Tareas"); 

        grupo.MapGet("/", (ITareaService service) => Results.Ok(service.ObtenerTodas()));
        grupo.MapGet("/{id}", (int id, ITareaService service) =>
        {
            var tarea = service.ObtenerPorId(id);
            return tarea is null ? Results.NotFound(new { mensaje = "Tarea no encontrada"}) : 
            Results.Ok(tarea);
        });
        grupo.MapPost("/", (Tarea nuevaTarea, ITareaService service) =>
        {
            var creada = service.Agregar(nuevaTarea);
            return Results.Created($"/tareas/{creada.Id}", creada);
        });
        grupo.MapPut("/{id}", (int id, Tarea tarea, ITareaService service) =>
            service.Actualizar(id, tarea) ? Results.NoContent() :
            Results.NotFound( new { mensaje = "Tarea no encontrada" })
        );
        grupo.MapDelete("/{id}", (int id, ITareaService service) =>
            service.Eliminar(id) ? Results.NoContent() :
            Results.NotFound( new { mensaje = "Tarea no encontrada" })
        );
    }
}