"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ShieldCheck, AlertTriangle } from "lucide-react";

export default function DafoMatrix() {
  const cards = [
    {
      id: "fortalezas",
      title: "Fortalezas",
      icon: <ShieldCheck className="w-8 h-8 text-[#00F0FF]" />,
      content: "Agilidad estructural, altos conocimientos técnicos del equipo fundador, metodología de trabajo 100% cloud, costes fijos bajos (Lean Startup).",
      color: "from-[#00F0FF]/20 to-transparent",
      borderColor: "border-[#00F0FF]/30",
      glow: "hover:box-glow-cyan"
    },
    {
      id: "oportunidades",
      title: "Oportunidades",
      icon: <ArrowUpRight className="w-8 h-8 text-[#8A2BE2]" />,
      content: "Subvenciones gubernamentales a la digitalización, alta demanda de optimización de procesos, consolidación del teletrabajo.",
      color: "from-[#8A2BE2]/20 to-transparent",
      borderColor: "border-[#8A2BE2]/30",
      glow: "hover:box-glow-purple"
    },
    {
      id: "debilidades",
      title: "Debilidades",
      icon: <ArrowDownRight className="w-8 h-8 text-orange-400" />,
      content: "Marca de nueva creación sin historial previo en el mercado, equipo humano inicialmente reducido.",
      color: "from-orange-400/20 to-transparent",
      borderColor: "border-orange-400/30",
      glow: "hover:shadow-[0_0_15px_rgba(251,146,60,0.3)]"
    },
    {
      id: "amenazas",
      title: "Amenazas",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      content: "Rápida evolución de las herramientas de IA que exige formación continua, aparición de nuevos competidores de bajo coste en otros continentes.",
      color: "from-red-500/20 to-transparent",
      borderColor: "border-red-500/30",
      glow: "hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
    }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="dafo">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Análisis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">DAFO</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Evaluación estratégica del entorno B2B y posicionamiento en el mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`glass relative overflow-hidden rounded-2xl border ${card.borderColor} p-8 group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${card.glow}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10 flex items-center mb-6">
              <div className="p-3 bg-[#0B0F19]/80 rounded-xl mr-4 backdrop-blur-sm border border-white/5">
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
