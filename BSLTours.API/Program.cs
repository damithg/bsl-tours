using BSLTours.API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IDataService, InMemoryDataService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add API versioning - new in .NET 8
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "BSL Tours API", 
        Version = "v1",
        Description = "API for Best Sri Lanka Tours website"
    });
});

// Add observability - new in .NET 8
// Uncomment when adding OpenTelemetry NuGet packages
// builder.Services.AddOpenTelemetry()
//     .WithTracing(tracing => tracing
//         .AddAspNetCoreInstrumentation()
//         .AddHttpClientInstrumentation())
//     .WithMetrics(metrics => metrics
//         .AddAspNetCoreInstrumentation()
//         .AddHttpClientInstrumentation());

// Build the app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the app to use HTTPS redirection
app.UseHttpsRedirection();

// Use CORS middleware
app.UseCors();

// Add authorization middleware
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Run the app on port 5001 to avoid conflict with Express server
app.Run("http://0.0.0.0:5001");