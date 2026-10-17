using Api.TareasAPI.Services;
using TareasAPI.Models;

namespace TareasAPI.Endpoints;

public static class TareasEndpoints
{
    public static void MapTareasEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/tareas").WithTags("Tareas");

        // GET: /tareas
        group.MapGet("/", (ITareaServices service) =>
            Results.Ok(service.GetAllTareas())
        );

        // GET: /tareas/{id}
        group.MapGet("/{id}", (int id, ITareaServices service) =>
        {
            var tarea = service.GetTareaById(id);
            return tarea is not null
            ? Results.NotFound(new { message = $"Tarea con id {id} no encontrada" })
            : Results.Ok(tarea);
        });

        // POST: /tareas
        group.MapPost("/", (Tarea nuevatarea, ITareaServices service) =>
        {
            var creada = service.CreateTarea(nuevatarea);
            return Results.Created($"/api/tareas/{creada.Id}", creada); //201
        });

        // PUT: /tareas/{id}
        group.MapPut("/{id}", (int id, Tarea tarea, ITareaServices service) =>
            service.UpdateTarea(id, tarea)
                ? Results.NoContent() //204 
                : Results.NotFound(new { message = $"Tarea con id {id} no encontrada" })
        );

        // DELETE: /tareas/{id}
        group.MapDelete("/{id}", (int id, Tarea tarea, ITareaServices service) =>
            service.DeleteTarea(id)
                ? Results.NoContent() //204
                : Results.NotFound(new { message = $"Tarea con id {id} no encontrada" })
        );
    }
}


