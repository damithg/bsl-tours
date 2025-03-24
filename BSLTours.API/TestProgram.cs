using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Completely minimal configuration
var app = builder.Build();

// Add a simple test endpoint
app.MapGet("/test", () => "API is working correctly!");

// Run on HTTP only
app.Run("http://0.0.0.0:5001");