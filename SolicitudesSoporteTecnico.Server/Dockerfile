
# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el proyecto
COPY . .

# Restaurar dependencias
RUN dotnet restore

# Compilar y publicar
RUN dotnet publish -c Release -o /app/publish --no-restore

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

# Puerto interno de la API
EXPOSE 7297

ENV ASPNETCORE_HTTP_PORTS=8080

ENTRYPOINT ["dotnet", "SolicitudesSoporteTecnico.Server.dll"]
