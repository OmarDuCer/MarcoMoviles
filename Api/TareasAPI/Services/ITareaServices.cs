using TareasAPI.Models;

namespace Api.TareasAPI.Services;

public interface ITareaServices
{
    IEnumerable<Tarea> GetAllTareas();
    Tarea? GetTareaById(int id);
    Tarea CreateTarea(Tarea tarea);
    bool UpdateTarea(int id, Tarea tarea);
    bool DeleteTarea(int id);
}