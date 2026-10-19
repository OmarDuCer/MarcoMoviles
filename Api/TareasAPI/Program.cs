using TAREASAPI.Endpoints;
using TAREASAPI.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// Register the TareaService as a singleton
builder.Services.AddSingleton<ITareaService, TareaService>();

// Register the LicenciaService as a singleton
builder.Services.AddSingleton<ILicenciaService, LicenciaService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TareasAPI v1");
    });
}

// Welcome message to check that the API is running
app.MapGet("/", () => Results.Ok(new { mensaje = "TareasAPI funcionando. Documentación en /swagger" }))
    .ExcludeFromDescription();

// Sirve los archivos de la carpeta wwwroot (el front: index.html)
app.UseStaticFiles();

// Map the Tarea endpoints
app.MapTareaEndpoints();

// Map the Licencia endpoints
app.MapLicenciaEndpoints();

app.Run();
