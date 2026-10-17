using TareasAPI.Models;

namespace TareasAPI.Endpoints;

public static class TareasEndpoints
{
    // Lista compartida — en producción esto sería una base de datos
    private static List<Tarea> _tareas = new List<Tarea>
    {
        new Tarea { Id = 1, Titulo = "Aprender .NET", Completada = false },
    };

    // Este método registra todos los endpoints del grupo
    public static void Map(WebApplication app)
    {
        var group = app.MapGroup("/tareas");

        group.MapGet("/", ObtenerTodas);
        group.MapGet("/{id}", ObtenerPorId);
        group.MapPost("/", Crear);
        group.MapPut("/{id}", Actualizar);
        group.MapDelete("/{id}", Eliminar);
    }

    // ── Handlers (lógica de cada endpoint) ──────────

    static IResult ObtenerTodas()
        => Results.Ok(_tareas);

    static IResult ObtenerPorId(int id)
    {
        var t = _tareas.FirstOrDefault(t => t.Id == id);
        return t == null ? Results.NotFound() : Results.Ok(t);
    }

    static IResult Crear(Tarea nueva)
    {
        nueva.Id = _tareas.Count > 0 ? _tareas.Max(t => t.Id) + 1 : 1;
        _tareas.Add(nueva);
        return Results.Created($"/tareas/{nueva.Id}", nueva);
    }

    static IResult Actualizar(int id, Tarea actualizada)
    {
        var t = _tareas.FirstOrDefault(t => t.Id == id);
        if (t == null) return Results.NotFound();

        t.Titulo = actualizada.Titulo;
        t.Descripcion = actualizada.Descripcion;
        t.Completada = actualizada.Completada;
        return Results.NoContent();
    }

    static IResult Eliminar(int id)
    {
        var t = _tareas.FirstOrDefault(t => t.Id == id);
        if (t == null) return Results.NotFound();

        _tareas.Remove(t);
        return Results.NoContent();
    }
}


