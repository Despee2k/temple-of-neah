using Argus.Sync.Data.Models;
using Argus.Sync.Extensions;
using TempleOfNeah.Sync.Data.Context;

// Build the application
var builder = WebApplication.CreateBuilder(args);

// Add API services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Argus services
builder.Services.AddCardanoIndexer<MyDbContext>(builder.Configuration);
builder.Services.AddReducers<MyDbContext, IReducerModel>(builder.Configuration);

// Launch!
var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();