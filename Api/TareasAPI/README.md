# TareasAPI

Una Web API para gestionar una lista de tareas (To-Do List), construida con
**.NET 10** y **Minimal APIs**. Es la implementación del tutorial `ACTIVITY.md`.

---

## ¿Qué hace esta API?

Expone 5 direcciones (endpoints) para manejar tareas. Cualquier programa
—una app móvil, una página web, o el navegador— puede llamarlas por internet:

| Método   | Ruta            | Qué hace                     | Respuesta si sale bien |
| -------- | --------------- | ---------------------------- | ---------------------- |
| `GET`    | `/tareas`       | Devuelve todas las tareas    | `200 OK` + lista JSON  |
| `GET`    | `/tareas/{id}`  | Devuelve una tarea concreta  | `200 OK` + la tarea    |
| `POST`   | `/tareas`       | Crea una tarea nueva         | `201 Created`          |
| `PUT`    | `/tareas/{id}`  | Reemplaza los datos de una   | `204 No Content`       |
| `DELETE` | `/tareas/{id}`  | Borra una tarea              | `204 No Content`       |

Y si algo va mal:

| Código | Cuándo aparece                                     |
| ------ | -------------------------------------------------- |
| `400`  | Mandaste datos inválidos (ej. título vacío)        |
| `404`  | Pediste una tarea con un Id que no existe          |

---

## Cómo ejecutarla

```bash
cd TareasAPI
dotnet run
```

Verás en la terminal algo como `Now listening on: http://localhost:5134`.
Entonces abre en tu navegador:

- **http://localhost:5134/swagger** → página visual para probar todo con clics
- **http://localhost:5134/tareas** → los datos en crudo (JSON)

Para **detener** la API: `Ctrl + C` en la terminal.

> 💡 Usa `dotnet watch run` en lugar de `dotnet run` y la API se reiniciará
> sola cada vez que guardes un cambio en el código.

---

## Cómo probarla

**Opción 1 — Swagger (lo más fácil).**
Entra a `/swagger`, despliega un endpoint, pulsa **"Try it out"**, rellena los
datos si hace falta y pulsa **"Execute"**. Abajo verás la respuesta real.

**Opción 2 — El archivo `TareasAPI.http`.**
Instala la extensión *REST Client* en VS Code, abre ese archivo y pulsa
**"Send Request"** sobre cualquier petición.

**Opción 3 — La terminal con `curl`.**

```bash
# Ver todas las tareas
curl http://localhost:5134/tareas

# Crear una tarea
curl -X POST http://localhost:5134/tareas \
     -H "Content-Type: application/json" \
     -d '{"titulo":"Comprar pan","descripcion":"Integral","completada":false}'

# Borrar la tarea 2
curl -X DELETE http://localhost:5134/tareas/2
```

---

## Qué hay en cada archivo

```
TareasAPI/
├── Program.cs                    ← Enciende la app y registra los endpoints
├── Models/
│   └── Tarea.cs                  ← Define QUÉ datos tiene una tarea
├── Endpoints/
│   └── TareasEndpoints.cs        ← La lógica: crear, leer, actualizar, borrar
├── Properties/
│   └── launchSettings.json       ← En qué puerto arranca (5134)
├── appsettings.json              ← Configuración general (nivel de logs)
├── TareasAPI.csproj              ← Ficha técnica: versión de .NET y librerías
├── TareasAPI.http                ← Peticiones listas para probar
└── README.md                     ← Este archivo
```

Los tres archivos `.cs` están comentados línea por línea. Si eres principiante,
léelos en este orden: **`Models/Tarea.cs` → `Program.cs` → `Endpoints/TareasEndpoints.cs`**.

---

## Cosas importantes que debes saber

**Los datos no se guardan.** Las tareas viven en una lista en la memoria RAM
del servidor (`_tareas` en `TareasEndpoints.cs`). Al detener la aplicación se
borra todo y al volver a arrancar reaparecen las 2 tareas de ejemplo. Para
guardarlas de verdad, el siguiente paso sería una base de datos con
**Entity Framework Core**.

**Swagger cambió en .NET 10.** Muchos tutoriales (incluido `ACTIVITY.md`) dicen
que uses `AddSwaggerGen()` y `UseSwagger()`. Eso ya **no existe** por defecto
desde .NET 9. Ahora .NET genera solo el archivo JSON con `AddOpenApi()` +
`MapOpenApi()`, y la página visual se añade aparte con el paquete
`Swashbuckle.AspNetCore.SwaggerUi`. Este proyecto ya usa la forma correcta.

**HTTPS está desactivado a propósito.** `app.UseHttpsRedirection()` está
comentado en `Program.cs` para que no tengas que pelearte con certificados
mientras aprendes. En un servidor real sí se activa.

---

## Requisitos

- .NET 10 SDK (`dotnet --version` debe mostrar `10.0.x`)
- En Arch Linux: `sudo pacman -S dotnet-sdk aspnet-runtime aspnet-targeting-pack`

---

## Para seguir aprendiendo

- **Entity Framework Core** — guardar los datos en una base de datos real
- **Autenticación con JWT** — proteger endpoints con usuario y contraseña
- **Paginación** — no devolver 10.000 registros de golpe
- **xUnit** — pruebas automáticas de los endpoints
- **Docker** — empaquetar la API para llevarla a cualquier servidor

📚 Documentación oficial: https://learn.microsoft.com/es-es/aspnet/core/fundamentals/minimal-apis
