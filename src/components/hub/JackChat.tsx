import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Bot, X, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const JACK_SUGGESTIONS = [
  "What's the status of all active projects?",
  "Show me critical risks across the portfolio",
  "Summarize today's briefing",
  "Which projects are behind schedule?",
];

export function JackChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Good morning, Devin. I'm Jack, your operating system intelligence layer. I've reviewed all active projects and flagged 2 items that need your attention today. How can I help?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    const responses: Record<string, string> = {
      status:
        "Across your 12 active projects:\n\n• **8 on track** — no issues\n• **3 at risk** — supply chain delays on Riverside, permit holdup on Downtown Tower, labor shortage at Westfield\n• **1 critical** — Marina Bay foundation work halted pending soil report\n\nWant me to drill into any of these?",
      risk: "Here are the top 3 risks flagged this week:\n\n1. **Marina Bay** — Soil contamination report delayed 2 weeks. Impact: $420K cost overrun if not resolved by Friday.\n2. **Downtown Tower** — Permit resubmission required. City feedback received yesterday.\n3. **Westfield Commons** — Concrete supplier capacity at 85%. Backup supplier identified.\n\nShall I draft an action plan for any of these?",
      briefing:
        "**Today's Briefing — April 6, 2026**\n\n📊 Portfolio health: 87% (↑2% from last week)\n⚠️ 2 decisions pending your approval\n💰 Cash flow projection updated — Q2 looking strong\n📋 3 contracts awaiting signature\n\nThe most urgent item is the Marina Bay soil report decision. Would you like me to pull up the details?",
      schedule:
        "Projects behind schedule:\n\n1. **Marina Bay** — 12 days behind (foundation phase)\n2. **Downtown Tower** — 5 days behind (permitting)\n3. **Parkview Residences** — 3 days behind (weather delays, recovering)\n\nAll others are on track or ahead. Want me to show recovery plans?",
    };

    const lowerMsg = userMessage.toLowerCase();
    let response =
      "I've noted your request. Let me analyze the data and get back to you with a comprehensive answer. In the meantime, is there anything specific you'd like me to prioritize?";

    if (lowerMsg.includes("status") || lowerMsg.includes("active project")) {
      response = responses.status;
    } else if (lowerMsg.includes("risk") || lowerMsg.includes("critical")) {
      response = responses.risk;
    } else if (lowerMsg.includes("briefing") || lowerMsg.includes("today")) {
      response = responses.briefing;
    } else if (lowerMsg.includes("behind") || lowerMsg.includes("schedule") || lowerMsg.includes("late")) {
      response = responses.schedule;
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    }, 1200 + Math.random() * 800);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    simulateResponse(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    simulateResponse(text);
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        style={{ boxShadow: "0 0 20px hsl(var(--glow-primary) / 0.3)" }}
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium">Ask Jack</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[420px] h-[600px] rounded-xl border border-border bg-card shadow-2xl overflow-hidden fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-sidebar">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Jack</h3>
            <p className="text-[10px] text-muted-foreground">Kulka Intelligence Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-healthy))] mr-2" style={{ boxShadow: "0 0 6px hsl(var(--glow-healthy) / 0.5)" }} />
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              )}
            >
              {msg.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                  {i < msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggestions — only show if just the welcome message */}
        {messages.length === 1 && !isTyping && (
          <div className="space-y-2 pt-2">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Suggested</p>
            <div className="grid grid-cols-1 gap-1.5">
              {JACK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-left text-xs px-3 py-2 rounded-lg border border-border bg-muted/50 text-foreground hover:bg-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 bg-sidebar">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Jack anything..."
            rows={1}
            className="flex-1 resize-none bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring max-h-24"
            style={{ minHeight: "40px" }}
          />
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-lg"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
