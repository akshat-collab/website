/**
 * Nova ChatBot — compact, theme-matched (Apple/Tesla tokens)
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { X, Send, MessageCircle } from "lucide-react";
import { searchKnowledgeBase } from "@/data/knowledgeBase";
import { cn } from "@/lib/utils";

interface Message {
  from: "user" | "bot";
  text: string;
  source?: "knowledge" | "api" | "fallback";
}

const HARDCODED_FALLBACK =
  "I'm Nova, your TechMaster assistant! Ask about DSA, Student Corner, CTF, or our team.";

const ChatBot = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const hideOnStudent = location.pathname.startsWith("/student-corner");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi — I'm Nova. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastRequestTimeRef = useRef(0);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-chatbot", open);
    return () => window.removeEventListener("open-chatbot", open);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const now = Date.now();
    if (now - lastRequestTimeRef.current < 400) return;
    lastRequestTimeRef.current = now;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    if (isHomePage) {
      const reply = searchKnowledgeBase(userMessage) || HARDCODED_FALLBACK;
      setMessages((prev) => [...prev, { from: "bot", text: reply, source: "knowledge" }]);
      setIsLoading(false);
      return;
    }

    try {
      const conversationHistory = messages.slice(-5);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId, conversationHistory }),
      });
      const data = await response.json();
      if (response.ok && data.response) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.response, source: data.source || "api" },
        ]);
      } else {
        const fallback = searchKnowledgeBase(userMessage) || HARDCODED_FALLBACK;
        setMessages((prev) => [...prev, { from: "bot", text: fallback, source: "fallback" }]);
      }
    } catch {
      const fallback = searchKnowledgeBase(userMessage) || HARDCODED_FALLBACK;
      setMessages((prev) => [...prev, { from: "bot", text: fallback, source: "fallback" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (hideOnStudent) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-[819px]:bottom-20">
      {isOpen ? (
        <div
          className={cn(
            "w-[280px] h-[340px] flex flex-col rounded-2xl border shadow-xl overflow-hidden",
            "bg-background border-border text-foreground"
          )}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
            <span className="text-xs font-semibold tracking-tight">Nova</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Close chat"
            >
              <X size={14} />
            </button>
          </div>

          <div className="px-2 py-1.5 border-b border-border flex flex-wrap gap-1">
            {["About TechMaster", "Student Corner", "DSA help"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setInput(q)}
                className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={cn(
                    "max-w-[85%] px-2.5 py-1.5 rounded-xl text-[12px] leading-snug break-words",
                    msg.from === "user"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="text-[11px] text-muted-foreground px-1">Nova is typing…</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-border flex gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message…"
              disabled={isLoading}
              className="flex-1 text-[12px] px-2.5 py-1.5 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-foreground/30 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-40"
              aria-label="Send"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-11 w-11 rounded-full border border-border bg-foreground text-background shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label="Open Nova chat"
        >
          <MessageCircle size={18} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
