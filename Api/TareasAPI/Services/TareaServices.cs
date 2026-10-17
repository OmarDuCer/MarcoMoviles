using TareasAPI.Models;

namespace Api.TareasAPI.Services;

public class TareasService : ITareaServices
{
    private readonly List<Tarea> _tareas = new()
    {
        new Tarea { Id = 1, Titulo = "Tarea 1", Descripcion = "Descripción de la tarea 1", Completada = false },
        new Tarea { Id = 2, Titulo = "Tarea 2", Descripcion = "Descripción de la tarea 2", Completada = true },
    };

    //public IEnumerable<Tarea> GetAllTareas()
    //{
    //    return _tareas;
    //}

    public IEnumerable<Tarea> GetAllTareas() => _tareas;

    public Tarea? GetTareaById(int id)
    {
        return _tareas.FirstOrDefault(t => t.Id == id);
    }
    public Tarea CreateTarea(Tarea tarea)
    {
        tarea.Id = _tareas.Count > 0 ? _tareas.Max(t => t.Id) + 1 : 1;
        _tareas.Add(tarea);
        return tarea;
    }

    public bool UpdateTarea(int id, Tarea tarea)
    {
        var existingTarea = GetTareaById(id);
        //var existingTarea = _tareas.FirstOrDefault(t => t.Id == id);
        if (existingTarea is null) return false;

        existingTarea.Titulo = tarea.Titulo;
        existingTarea.Descripcion = tarea.Descripcion;
        existingTarea.Completada = tarea.Completada;

        return true;
    }

    public bool DeleteTarea(int id)
    {
        var tarea = _tareas.FirstOrDefault(t => t.Id == id);
        if (tarea == null)
        {
            return false;
        }

        _tareas.Remove(tarea);
        return true;
    }

}