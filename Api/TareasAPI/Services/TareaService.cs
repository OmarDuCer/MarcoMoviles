using TAREASAPI.Models;
namespace TAREASAPI.Services;

public class TareaService : ITareaService
{
    private readonly List<Tarea> _tareas = new()
    {
        new Tarea { Id = 1, Titulo = "Tarea 1", Descripcion = "Descripción de la tarea 1", Completada = false },
        new Tarea { Id = 2, Titulo = "Tarea 2", Descripcion = "Descripción de la tarea 2", Completada = true },
        new Tarea { Id = 3, Titulo = "Tarea 3", Descripcion = "Descripción de la tarea 3", Completada = false }
    };

    public IEnumerable<Tarea> ObtenerTodas()
    {
        return _tareas;
    }

    public Tarea? ObtenerPorId(int id)
    {
        return _tareas.FirstOrDefault(t => t.Id == id);
    }

    public Tarea Agregar(Tarea tarea)
    {
        tarea.Id = _tareas.Count > 0 ? _tareas.Max(t => t.Id) + 1 : 1;
        _tareas.Add(tarea);
        return tarea;
    }

    public bool Actualizar(int id, Tarea tarea)
    {
        var tareaExistente = _tareas.FirstOrDefault(t => t.Id == id);
        if (tareaExistente == null) return false;

        tareaExistente.Titulo = tarea.Titulo;
        tareaExistente.Descripcion = tarea.Descripcion;
        tareaExistente.Completada = tarea.Completada;
        return true;
    }

    public bool Eliminar(int id)
    {
        var tareaExistente = _tareas.FirstOrDefault(t => t.Id == id);
        if (tareaExistente == null) return false;

        _tareas.Remove(tareaExistente);
        return true; 
    }
}