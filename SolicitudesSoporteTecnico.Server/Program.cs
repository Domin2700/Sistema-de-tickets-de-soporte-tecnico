using Microsoft.EntityFrameworkCore;
using SolicitudesSoporteTecnico.Server.Context;
using SolicitudesSoporteTecnico.Server.Servicios;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Inyeccion del servicio
builder.Services.AddScoped<
    ISolicitudesService,
    SolicitudesService>();

//Inyeccion del contexto de datos
builder.Services.AddDbContext<SoporteDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLCnnSolicitudesSoporteTecnico"));

});


//Configuracion de Cors 
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "SolicitudesPolicy", configurePolicy: policyBuilder => {
        policyBuilder.WithOrigins("https://localhost:55923");
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowCredentials();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


app.UseCors("SolicitudesPolicy");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
