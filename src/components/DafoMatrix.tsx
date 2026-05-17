"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ShieldCheck, AlertTriangle } from "lucide-react";

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#00F0FF]/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0, 0.6, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function DafoMatrix() {
  const cards = [
    {
      id: "fortalezas",
      title: "Fortalezas",
      icon: <ShieldCheck className="w-8 h-8 text-[#00F0FF]" />,
      content: "Agilidad estructural, altos conocimientos técnicos del equipo fundador, metodología de trabajo 100% cloud, costes fijos bajos (Lean Startup).",
      color: "from-[#00F0FF]/20 to-transparent",
      borderColor: "border-[#00F0FF]/30",
      glow: "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
      accentColor: "#00F0FF"
    },
    {
      id: "oportunidades",
      title: "Oportunidades",
      icon: <ArrowUpRight className="w-8 h-8 text-[#8A2BE2]" />,
      content: "Subvenciones gubernamentales a la digitalización, alta demanda de optimización de procesos, consolidación del teletrabajo.",
      color: "from-[#8A2BE2]/20 to-transparent",
      borderColor: "border-[#8A2BE2]/30",
      glow: "hover:shadow-[0_0_30px_rgba(138,43,226,0.15)]",
      accentColor: "#8A2BE2"
    },
    {
      id: "debilidades",
      title: "Debilidades",
      icon: <ArrowDownRight className="w-8 h-8 text-orange-400" />,
      content: "Marca de nueva creación sin historial previo en el mercado, equipo humano inicialmente reducido.",
      color: "from-orange-400/20 to-transparent",
      borderColor: "border-orange-400/30",
      glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
      accentColor: "#FB923C"
    },
    {
      id: "amenazas",
      title: "Amenazas",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      content: "Rápida evolución de las herramientas de IA que exige formación continua, aparición de nuevos competidores de bajo coste en otros continentes.",
      color: "from-red-500/20 to-transparent",
      borderColor: "border-red-500/30",
      glow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
      accentColor: "#EF4444"
    }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto relative" id="dafo">
      
      {/* ===== BACKGROUND SVG DECORATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dafo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00F0FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dafo-grid)" />
        </svg>

        {/* Radial Glow Behind Title */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-[#8A2BE2]/8 to-transparent rounded-full blur-3xl" />
        
        {/* Corner Circuit Decorations */}
        <svg className="absolute top-12 left-4 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="none">
          <motion.path d="M 10 50 L 10 10 L 50 10" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2 }} />
          <motion.circle cx="10" cy="50" r="3" fill="#00F0FF"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="50" cy="10" r="3" fill="#00F0FF"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        </svg>
        <svg className="absolute top-12 right-4 w-32 h-32 opacity-10 scale-x-[-1]" viewBox="0 0 100 100" fill="none">
          <motion.path d="M 10 50 L 10 10 L 50 10" stroke="#8A2BE2" strokeWidth="1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }} />
          <motion.circle cx="10" cy="50" r="3" fill="#8A2BE2"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="50" cy="10" r="3" fill="#8A2BE2"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        </svg>

        {/* Bottom Horizontal Line */}
        <svg className="absolute bottom-16 left-0 w-full h-1 opacity-10">
          <motion.line x1="0" y1="0" x2="100%" y2="0" stroke="url(#line-gradient-dafo)" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2 }} />
          <defs>
            <linearGradient id="line-gradient-dafo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#00F0FF" />
              <stop offset="70%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* ===== CONTENT ===== */}
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Análisis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">DAFO</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Evaluación estratégica del entorno B2B y posicionamiento en el mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 relative z-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`glass relative overflow-hidden rounded-2xl border ${card.borderColor} p-8 group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${card.glow}`}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Subtle inner grid per card */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`card-grid-${card.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke={card.accentColor} strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#card-grid-${card.id})`} />
              </svg>
            </div>

            {/* Corner accent line */}
            <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M 64 0 L 64 64 L 0 64" stroke={card.accentColor} strokeWidth="1" opacity="0.3" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center mb-6">
              <div className="p-3 bg-[#0B0F19]/80 rounded-xl mr-4 backdrop-blur-sm border border-white/5 group-hover:border-white/15 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold tracking-wide">{card.title}</h3>
            </div>

            <div className="relative z-10 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <p className="text-gray-300 leading-relaxed pt-2 border-t border-white/10 mt-2">
                {card.content}
              </p>
            </div>

            <div className="relative z-10 text-gray-500 text-sm group-hover:hidden transition-all duration-300 absolute bottom-8">
              Pasa el cursor para ver detalles
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
