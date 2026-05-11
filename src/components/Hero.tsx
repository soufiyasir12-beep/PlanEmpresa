"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToChat = () => {
    const chatElement = document.getElementById("chatbot");
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background SVG Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,50 Q 25,25 50,50 T 100,50"
            fill="transparent"
            stroke="var(--color-neon-cyan)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 0,70 Q 25,45 50,70 T 100,70"
            fill="transparent"
            stroke="var(--color-neon-purple)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </motion.svg>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#8A2BE2]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Solutions & Automation
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-gray-300 font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Democratizando la <span className="text-glow-cyan text-white font-semibold">IA</span> para PYMEs
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transformamos negocios tradicionales mediante Inteligencia Artificial,
          Automatización Robótica (RPA) y Chatbots, impulsando el crecimiento y
          reduciendo costes operativos.
        </motion.p>

        <motion.button
          onClick={scrollToChat}
          className="group relative px-8 py-4 bg-[#0B0F19] border border-[#00F0FF]/50 rounded-full text-white font-medium box-glow-cyan overflow-hidden transition-all hover:border-[#00F0FF] hover:scale-105 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#8A2BE2]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 text-glow-cyan">Interactuar con el Producto</span>
          <ArrowDown className="relative z-10 w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
