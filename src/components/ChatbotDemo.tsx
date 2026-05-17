"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export default function ChatbotDemo() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      { id: '1', role: "assistant", content: "¡Hola! Soy el recepcionista virtual de AI Solutions & Automation. ¿En qué puedo ayudarte a entender nuestro Plan de Empresa o nuestros servicios B2B?" }
    ],
    onError: (err) => {
      console.error("Chat error:", err);
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto" id="chatbot">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">DEMO EN VIVO</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Interactúa con nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">IA</span>
        </motion.h2>
        <p className="text-gray-400 text-lg">
          Prueba nuestro recepcionista virtual potenciado por Gemini 3.1 Flash Lite.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[min(600px,70vh)] relative box-glow-cyan"
      >
        {/* Terminal Header */}
        <div className="bg-[#0B0F19]/80 border-b border-white/10 p-4 flex items-center justify-between backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-sm text-gray-400 font-mono ml-2">assistant.exe</span>
          </div>
          <div className="text-xs text-[#00F0FF] font-mono px-2 py-1 bg-[#00F0FF]/10 rounded border border-[#00F0FF]/20">
            ONLINE
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#0B0F19]/40 relative">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-[#8A2BE2]/80 to-[#8A2BE2] shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                    : "bg-gradient-to-br from-[#00F0FF]/80 to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-[#0B0F19]" />}
                </div>
                <div className={`px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#8A2BE2]/20 border border-[#8A2BE2]/30 text-white rounded-tr-none"
                    : "glass border border-[#00F0FF]/20 text-gray-200 rounded-tl-none prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-a:text-[#00F0FF] max-w-full"
                }`}>
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF]/80 to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-[#0B0F19]" />
              </div>
              <div className="glass border border-[#00F0FF]/20 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce"></div>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/80 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl rounded-tl-none px-5 py-3 text-sm">
                Ups, parece que hubo un error de conexión. Por favor, inténtalo de nuevo.
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0B0F19]/80 border-t border-white/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Pregunta sobre nuestro plan de empresa..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]/50 focus:ring-1 focus:ring-[#00F0FF]/50 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-gradient-to-r from-[#00F0FF] to-[#00d0ff] hover:from-[#8A2BE2] hover:to-[#7a24c9] text-[#0B0F19] hover:text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
