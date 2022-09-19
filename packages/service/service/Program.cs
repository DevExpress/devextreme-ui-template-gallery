using Microsoft.EntityFrameworkCore;
using service.Models;
using service.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options => {
    options.AddPolicy("ApplicationPolicy",
        builder => {
            builder.WithOrigins("*");
        });
});

builder.Services
    .AddMvc()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions
            .ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddDbContext<RwaContext>(options => {
    options.UseSqlServer(
        string.Format(
            builder.Configuration["connectionString"],
            Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "db")
        ));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    if (app.Configuration.GetValue<bool>("initializeDb")) {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        try {
            var context = services.GetRequiredService<RwaContext>();
            DbInitializer.UpdateContactManager(context);
        } catch (Exception ex) {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred creating the DB.");
        }
    }
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

//app.UseAuthorization();

app.MapControllers();

app.Run();
