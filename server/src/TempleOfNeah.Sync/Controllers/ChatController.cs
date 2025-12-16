using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace TempleOfNeah.Sync.Controllers;

/// <summary>
/// Proxy controller for the Gemini-powered learning assistant.
/// Keeps the API key on the server and enforces the teaching-focused system prompt.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    // IMPORTANT: Configure your Gemini API key via environment variable or appsettings.
    // Environment variable name: GEMINI_API_KEY
    private readonly string? _apiKey;

    // IMPORTANT: Model name for the Gemini API.
    // Change this constant if you want to target a different stable model.
    private const string ModelName = "gemini-1.5-pro";

    // Server-side copy of the system prompt.
    // Must stay in sync with the client config for consistent behavior.
    private const string SystemPrompt = """
You are a tutoring-focused assistant.
Always explain concepts in simple terms, step by step, with a strong focus on learner understanding.
Use concrete examples. Prefer short, clear explanations.

Behavior:
- Focus on helping the learner deeply understand concepts, not just give final answers.
- Break down complex ideas into small, logical steps.
- Ask brief clarification questions when the user’s request is ambiguous.

Word limits:
- Default maximum: 120 words per response.
- If the user explicitly asks for "more detail" or "more details", you may use up to 200 words.
- Do not exceed the active word limit—stop once you reach it.
""";

    private static readonly HttpClient HttpClient = new();

    public ChatController(IConfiguration configuration)
    {
        // Prefer environment variable; fall back to configuration if needed.
        _apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY") ??
                  configuration["Gemini:ApiKey"];
    }

    public record ChatMessageDto(string Role, string Content);

    public record ChatRequestDto(List<ChatMessageDto> Messages, int? WordLimit);

    public record ChatResponseDto(string Reply);

    [HttpPost]
    public async Task<ActionResult<ChatResponseDto>> Post([FromBody] ChatRequestDto requestDto)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            return StatusCode(500,
                "Gemini API key is not configured. Set GEMINI_API_KEY environment variable or Gemini:ApiKey in configuration.");
        }

        if (requestDto.Messages == null || requestDto.Messages.Count == 0)
        {
            return BadRequest("Messages are required.");
        }

        // Convert messages into Gemini content format.
        var contents = requestDto.Messages.Select(m => new
        {
            role = m.Role.Equals("assistant", StringComparison.OrdinalIgnoreCase)
                ? "model"
                : "user",
            parts = new[]
            {
                new { text = m.Content }
            }
        }).ToList();

        // Include the system prompt as systemInstruction to steer behavior.
        var body = new
        {
            systemInstruction = new
            {
                role = "system",
                parts = new[]
                {
                    new { text = SystemPrompt }
                }
            },
            contents,
            generationConfig = new
            {
                // The client still strictly enforces word limits by trimming,
                // but we can hint shorter responses with a small maxOutputTokens.
                maxOutputTokens = 512,
                temperature = 0.4,
            }
        };

        var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/{ModelName}:generateContent?key={_apiKey}";

        using var httpRequest = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = JsonContent.Create(body)
        };

        using var response = await HttpClient.SendAsync(httpRequest);

        if (!response.IsSuccessStatusCode)
        {
            var errorText = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode,
                $"Gemini API error: {response.StatusCode} - {errorText}");
        }

        using var stream = await response.Content.ReadAsStreamAsync();
        using var document = await JsonDocument.ParseAsync(stream);

        // Gemini generateContent returns: { "candidates": [ { "content": { "parts": [ { "text": "..." } ] } } ] }
        var root = document.RootElement;

        var replyText = root
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;

        return Ok(new ChatResponseDto(replyText));
    }
}


