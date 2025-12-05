using Argus.Sync.Data.Models;
using Argus.Sync.Extensions;
using TempleOfNeah.Sync.Data.Context;

// Build the application
var builder = WebApplication.CreateBuilder(args);

// Register Argus services
builder.Services.AddCardanoIndexer<MyDbContext>(builder.Configuration);
builder.Services.AddReducers<MyDbContext, IReducerModel>(builder.Configuration);

// Launch!
var app = builder.Build();
app.Run();