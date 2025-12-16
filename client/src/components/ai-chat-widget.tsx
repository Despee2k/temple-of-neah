import React, { useEffect, useMemo, useRef, useState } from "react";
import { CHAT_CONFIG } from "../config/chatConfig";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}


// Helper to detect if the user explicitly asked for more detail
function userRequestedMoreDetail(input: string): boolean {
  const lowered = input.toLowerCase();
  return (
    lowered.includes("more detail") ||
    lowered.includes("more details") ||
    lowered.includes("in more detail") ||
    lowered.includes("explain further")
  );
}

// Truncate text to a word limit, preferring sentence boundaries.
function truncateToWordLimit(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();

  const sentences = text
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  const keptSentences: string[] = [];
  let wordCount = 0;

  for (const sentence of sentences) {
    const sentenceWords = sentence.trim().split(/\s+/).length;
    if (wordCount + sentenceWords > maxWords) break;
    keptSentences.push(sentence.trim());
    wordCount += sentenceWords;
  }

  if (keptSentences.length > 0) {
    return keptSentences.join(" ");
  }

  const limitedWords = words.slice(0, maxWords);
  return limitedWords.join(" ").trim();
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your learning assistant. Ask me to explain any concept, and I'll break it down step by step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeWordLimit = useMemo(() => {
    return userRequestedMoreDetail(input)
      ? CHAT_CONFIG.EXTENDED_WORD_LIMIT
      : CHAT_CONFIG.DEFAULT_WORD_LIMIT;
  }, [input]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const apiKey = CHAT_CONFIG.API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error: Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.",
        },
      ]);
      return;
    }

    const newUserMessage: ChatMessage = {
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Convert messages into Gemini content format
      const contents = updatedMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const body = {
        systemInstruction: {
          role: "system",
          parts: [{ text: CHAT_CONFIG.SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.4,
        },
      };

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${CHAT_CONFIG.MODEL_NAME}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const rawReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const truncatedReply = truncateToWordLimit(rawReply, activeWordLimit);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: truncatedReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send chat message", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into a problem while contacting the learning assistant. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          aria-label="Open learning assistant"
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full border border-border bg-card text-primary shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:border-primary/50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col rounded-lg border border-border bg-card shadow-2xl overflow-hidden min-h-[32rem]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground">Learning Assistant</span>
                <span className="text-[11px] text-muted-foreground">
                  Step-by-step explanations
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-lg p-1.5 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Minimize learning assistant"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages - updated styling */}
          <div className="flex-1 max-h-96 overflow-y-auto px-4 py-3 bg-background space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 border border-border bg-muted/50 text-muted-foreground text-xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                  </div>
                  <span>Thinking</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer / input - matches your input styling */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-border bg-card px-4 py-3"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <textarea
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Ask a question or describe what you're learning..."
                />
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <span className="font-mono">
                    {activeWordLimit}w limit
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="mb-6 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiChatWidget;
