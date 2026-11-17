import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  RotateCcw,
  User,
  Sparkles,
  Minimize2,
  ChevronRight,
} from "lucide-react";
import { sendChatMessage } from "../service/ai.service";
import catGif from "../assets/cat_gif.gif";

interface IMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "👨‍⚕️ Available Veterinary Doctors", prompt: "Who are the specialist veterinary doctors at the clinic?" },
  { label: "⏰ Consulting Hours & Schedules", prompt: "What are the clinic's working hours and doctor consulting schedules?" },
  { label: "🩺 Medical Treatments & Services", prompt: "What veterinary services and treatments do you provide?" },
  { label: "📅 How to Book an Appointment", prompt: "How do I schedule an appointment with a doctor?" },
  { label: "🚨 24/7 Emergency Care Info", prompt: "What should I do in a pet health emergency?" },
];

const INITIAL_WELCOME_TEXT = 
  "Woof & Meow! 🐾 Welcome to PetCare & Vet Clinic! I am **PawBot**, your AI clinic healthcare assistant.\n\n" +
  "I am connected directly to our **live clinic database** with our doctors, consulting schedules, and services.\n\n" +
  "How can I help you and your furry companion today?";

// Helper to render markdown bold (**text**) and clean lists inside bot message bubbles
const renderFormattedMessage = (text: string) => {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    // Bullet points
    const isBullet = trimmed.startsWith("•") || trimmed.startsWith("*") || trimmed.startsWith("-");
    const cleanLine = isBullet ? trimmed.replace(/^[•*-]\s*/, "") : trimmed;

    // Parse **bold** parts
    const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="font-extrabold text-teal-900 dark:text-teal-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-teal-600 dark:text-teal-400 font-bold shrink-0 text-xs">🐾</span>
          <span className="flex-1 leading-relaxed">{content}</span>
        </div>
      );
    }

    return (
      <p key={lineIdx} className="leading-relaxed my-0.5">
        {content}
      </p>
    );
  });
};

export const PetChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: "welcome-init",
      sender: "bot",
      text: INITIAL_WELCOME_TEXT,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: IMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(text);
      const botMsg: IMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("PawBot Chat Error:", err);
      const errorMsg: IMessage = {
        id: "err-" + Date.now(),
        sender: "bot",
        text: "🐾 Oops! I couldn't reach the clinic database at this moment. Please try again in a few seconds or call our 24/7 hotline!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Reset to original clean welcome state when refresh button is clicked
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-init",
        sender: "bot",
        text: INITIAL_WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* FLOATING MASCOT TRIGGER BUTTON (Bottom-Right, NO CIRCLE CONTAINER) */}
      <div className="fixed bottom-5 right-4 sm:right-7 z-50 flex flex-col items-end pointer-events-auto select-none">
        
        {/* Floating Greeting Speech Bubble (Visible before first open) */}
        {!isOpen && showTooltip && (
          <div
            className="mb-2 relative animate-bounce flex items-center gap-2 bg-white/95 dark:bg-[#072124]/95 backdrop-blur-md border border-teal-200/90 dark:border-teal-600/60 shadow-xl px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-800 dark:text-teal-50 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <span className="text-base">🐱</span>
            <span>Hi! I'm <strong>PawBot</strong>! Need pet help?</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white/95 dark:bg-[#072124]/95 border-r border-b border-teal-200/90 dark:border-teal-600/60 rotate-45" />
          </div>
        )}

        {/* Pet Mascot Character Trigger — Completely Free Floating Character, NOT Inside A Circle Button */}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? "Close PawBot Chat" : "Open PawBot Chat"}
          className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 active:scale-95"
        >
          {isOpen ? (
            /* Close / Minimize Pill State */
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-800 to-emerald-700 hover:from-teal-900 hover:to-emerald-800 text-white rounded-full shadow-lg border border-teal-400/30 text-xs font-bold transition-all">
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minimize</span>
            </div>
          ) : (
            /* Adorable Pet Mascot Character (Standing/Floating freely with glowing badge) */
            <div className="relative flex flex-col items-center">
              {/* Pet Character Image (Cat Mascot with subtle drop-shadow and idle hover float) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <img
                  src={catGif}
                  alt="PawBot Pet Mascot"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_14px_rgba(13,148,136,0.35)]"
                />

                {/* Online Glowing Pulse Dot on Mascot */}
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#072124]" />
                </span>
              </div>

              {/* Sleek Name Tag Pill below pet mascot */}
              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-[#072124]/90 backdrop-blur-md border border-teal-300/70 dark:border-teal-600/50 shadow-md flex items-center gap-1 text-[11px] font-extrabold text-teal-800 dark:text-teal-200 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <span>🐾</span>
                <span>PawBot AI</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CHAT WINDOW MODAL PANEL */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-7 z-50 w-[calc(100vw-24px)] sm:w-[420px] max-w-[430px] h-[590px] max-h-[82vh] rounded-3xl bg-white/98 dark:bg-[#061e21]/98 backdrop-blur-2xl border border-teal-100 dark:border-teal-700/60 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* HEADER */}
          <div className="px-4 py-3 bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              {/* Pet Mascot Mini Avatar */}
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center overflow-hidden shadow-inner p-0.5">
                <img src={catGif} alt="PawBot" className="w-full h-full object-contain" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-teal-800 rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                    PawBot
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-200 border border-emerald-400/40">
                    Live Clinic AI
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/90 font-medium flex items-center gap-1">
                  <span>PetCare &amp; Vet Assistant</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-semibold">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Reset Conversation"
                className="p-1.5 rounded-xl hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-xl hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scroll-smooth bg-gradient-to-b from-[#f3faf8]/50 via-white/40 to-transparent dark:from-transparent dark:via-transparent">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-teal-50 dark:bg-teal-900/40 border border-teal-200/80 dark:border-teal-700/50 flex items-center justify-center shrink-0 shadow-xs mb-1 p-0.5 overflow-hidden">
                      <img src={catGif} alt="Paw" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`max-w-[85%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm break-words ${
                        isUser
                          ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-br-xs font-medium"
                          : "bg-white dark:bg-[#0a2c30] text-slate-800 dark:text-slate-100 border border-teal-100 dark:border-teal-700/60 rounded-bl-xs font-normal"
                      }`}
                    >
                      {isUser ? msg.text : renderFormattedMessage(msg.text)}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-xl bg-teal-700 text-white flex items-center justify-center text-xs shrink-0 shadow-xs mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* QUICK SUGGESTION PROMPTS — Rendered cleanly inside chat stream (Scrolls up naturally when chatting) */}
            {messages.length === 1 && (
              <div className="pl-9 pr-2 pt-1 pb-2 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-[11px] font-bold text-teal-800/80 dark:text-teal-300/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Frequently asked questions:</span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((qp) => (
                    <button
                      key={qp.label}
                      disabled={loading}
                      onClick={() => handleSendMessage(qp.prompt)}
                      className="text-left px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-[#0a2c30]/90 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-slate-700 dark:text-teal-100 border border-teal-200/70 dark:border-teal-700/50 text-xs font-semibold shadow-xs hover:shadow-sm hover:border-teal-400 dark:hover:border-teal-500 transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99] disabled:opacity-50"
                    >
                      <span>{qp.label}</span>
                      <ChevronRight className="w-4 h-4 text-teal-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SLEEK, MODERN TYPING INDICATOR */}
            {loading && (
              <div className="flex items-end gap-2 justify-start animate-in fade-in duration-200">
                <div className="w-7 h-7 rounded-xl bg-teal-50 dark:bg-teal-900/40 border border-teal-200/80 dark:border-teal-700/50 flex items-center justify-center shrink-0 shadow-xs mb-1 p-0.5 overflow-hidden">
                  <img src={catGif} alt="Paw" className="w-full h-full object-contain" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-white dark:bg-[#0a2c30] border border-teal-100 dark:border-teal-700/60 shadow-sm flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 py-0.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-bounce" style={{ animationDelay: "180ms" }} />
                    <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-bounce" style={{ animationDelay: "360ms" }} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-teal-300/80 tracking-wide">
                    PawBot is typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-[#061e21] border-t border-teal-100 dark:border-teal-700/50 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              disabled={loading}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about doctors, schedules, treatments..."
              className="flex-1 px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white shadow-md shadow-teal-700/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* COMPACT FOOTER NOTE */}
          <div className="py-1 px-3 bg-slate-100/60 dark:bg-black/30 border-t border-slate-200/60 dark:border-white/5 text-[9px] text-center text-slate-400 dark:text-slate-500 font-medium">
            🐾 PawBot answers in real-time using live clinic records. For emergencies, call 24/7 hotline.
          </div>
        </div>
      )}
    </>
  );
};

export default PetChatBot;
