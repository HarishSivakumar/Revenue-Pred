"use client";

import { useState, useRef, useEffect } from "react";
import { SAMPLE_CONVERSATIONS, SUGGESTED_QUESTIONS } from "@/data/copilot";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot, Send, User, MessageSquare, Code, Database,
  BarChart3, Sparkles, ChevronRight, Plus, Copy, Check,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

export default function CopilotPage() {
  const [activeConversation, setActiveConversation] = useState(SAMPLE_CONVERSATIONS[0]);
  const [inputValue, setInputValue] = useState("");
  const [sqlCopied, setSqlCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation.messages;
  const lastAssistantMsg = messages.findLast((m) => m.role === "assistant");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopySQL = () => {
    if (lastAssistantMsg?.sql) {
      navigator.clipboard.writeText(lastAssistantMsg.sql);
      setSqlCopied(true);
      setTimeout(() => setSqlCopied(false), 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Left: Conversation History */}
      <div className="w-64 shrink-0 bg-card border border-border/40 shadow-sm rounded-xl flex flex-col">
        <div className="p-4 border-b border-border/30">
          <Button variant="outline" className="w-full gap-2 text-sm border-border/50">
            <Plus className="w-4 h-4" /> New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {SAMPLE_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors",
                  activeConversation.id === conv.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent/40"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate pl-5.5">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center: Chat Area */}
      <div className="flex-1 flex flex-col bg-card border border-border/40 shadow-sm rounded-xl">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border/30">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Revenue AI Copilot</h3>
            <p className="text-[10px] text-muted-foreground">Powered by GPT-4 + RAG • Connected to Snowflake</p>
          </div>
          <Badge className="ml-auto bg-green-400/10 text-green-400 border-0 text-[10px]">
            <span className="status-dot status-success mr-1.5" />
            Online
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Revenue AI Copilot</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                  Ask me anything about your airline revenue data. I can analyze trends, compare routes, forecast demand, and provide actionable recommendations.
                </p>
                <div className="grid grid-cols-2 gap-2 max-w-lg">
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => setInputValue(q)}
                      className="text-left p-3 rounded-lg border border-border/30 hover:bg-accent/40 transition-colors text-xs text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight className="w-3 h-3 inline mr-1 text-primary" />{q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] rounded-2xl p-4",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-accent/40 rounded-bl-sm"
                  )}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                      )}
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length > 0 && (
          <div className="px-4 py-2 border-t border-border/20">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {SUGGESTED_QUESTIONS.slice(4, 8).map((q) => (
                <button
                  key={q}
                  onClick={() => setInputValue(q)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-border/30 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-2 bg-accent/30 rounded-xl p-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about revenue, routes, forecasts..."
              className="flex-1 bg-transparent text-sm outline-none px-2 placeholder:text-muted-foreground/50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  setInputValue("");
                }
              }}
            />
            <Button size="sm" className="rounded-lg gap-1.5" disabled={!inputValue.trim()}>
              <Send className="w-3.5 h-3.5" /> Send
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Context Panels */}
      <div className="w-72 shrink-0 space-y-4">
        {/* Generated Chart */}
        {lastAssistantMsg?.chartData && (
          <div className="bg-card border border-border/40 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold">{lastAssistantMsg.chartTitle}</h4>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={lastAssistantMsg.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={9} />
                <YAxis stroke="rgba(148,163,184,0.3)" fontSize={9} tickFormatter={(v) => `₹${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#3B82F6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Generated SQL */}
        {lastAssistantMsg?.sql && (
          <div className="bg-card border border-border/40 shadow-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold">Generated SQL</h4>
              </div>
              <button onClick={handleCopySQL} className="text-muted-foreground hover:text-foreground transition-colors">
                {sqlCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="text-[10px] font-mono bg-background/50 p-3 rounded-lg overflow-x-auto text-muted-foreground leading-relaxed">
              {lastAssistantMsg.sql}
            </pre>
          </div>
        )}

        {/* Sources */}
        {lastAssistantMsg?.sources && (
          <div className="bg-card border border-border/40 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold">Data Sources</h4>
            </div>
            <div className="space-y-1.5">
              {lastAssistantMsg.sources.map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-mono">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Actions */}
        {lastAssistantMsg?.actions && (
          <div className="bg-card border border-border/40 shadow-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold">Suggested Actions</h4>
            </div>
            <div className="space-y-2">
              {lastAssistantMsg.actions.map((a) => (
                <button
                  key={a}
                  className="w-full text-left px-3 py-2 rounded-lg border border-border/30 hover:bg-accent/40 transition-colors text-xs text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="w-3 h-3 inline mr-1 text-primary" />{a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
