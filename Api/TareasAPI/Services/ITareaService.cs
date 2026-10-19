using TAREASAPI.Models;
namespace TAREASAPI.Services;

public interface ITareaService
{
    IEnumerable<Tarea> ObtenerTodas();
    Tarea? ObtenerPorId(int id);
    Tarea Agregar(Tarea tarea);
    bool Actualizar(int id, Tarea tarea);
    bool Eliminar(int id);
}