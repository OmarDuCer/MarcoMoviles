namespace TareasAPI.Services;

public interface ITareaServices
{
    IEnumerable<Tarea> ObtenerTodas();
    Tarea ObtenerPorId(int id);
    Tarea Crear(Tarea tarea);
    bool Actualizar(Tarea, tarea);
}