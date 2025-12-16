import React, { useEffect, useMemo, useRef, useState } from "react";
import { CHAT_CONFIG } from "../config/chatConfig";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface ApiChatMessage {
  role: ChatRole;
  content: string;
}

interface ChatResponse {
  reply: string;
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

  // First, try to cut at sentence boundaries while respecting the word limit.
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

  // If even the first sentence exceeds the limit, fall back to a hard cut.
  const limitedWords = words.slice(0, maxWords);
  return limitedWords.join(" ").trim();
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your learning assistant. Ask me to explain any concept, and I’ll break it down step by step.",
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

    const newUserMessage: ChatMessage = {
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const payload = {
        messages: updatedMessages.map<ApiChatMessage>((m) => ({
          role: m.role,
          content: m.content,
        })),
        // Pass the active limit to the backend as a hint (client still enforces).
        wordLimit: activeWordLimit,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      const rawReply = (data.reply ?? "").toString();
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
      {/* Minimized bubble */}
      {!isOpen && (
        <button
          type="button"
          aria-label="Open learning assistant"
          onClick={handleToggle}
          className="fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}

      {/* Expanded widget */}
      <div
        className={`fixed bottom-4 right-4 z-40 w-80 max-w-[95vw] transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Neah Learning Assistant</span>
              <span className="text-[11px] text-slate-300">
                Ask me to explain any concept, step by step.
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="ml-3 rounded-full p-1 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              aria-label="Minimize learning assistant"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 max-h-80 overflow-y-auto px-3 py-2 bg-slate-50 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] whitespace-pre-wrap leading-snug ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-900 border border-slate-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-2 flex justify-start">
                <div className="rounded-lg px-3 py-2 max-w-[80%] bg-white text-slate-500 border border-slate-200 text-xs">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer / input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white px-3 py-2"
          >
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <textarea
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full resize-none rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ask a question or say what you’re trying to learn..."
                />
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Learning-focused answers, word-limited for clarity.</span>
                  <span>
                    Limit: {activeWordLimit} words
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiChatWidget;


