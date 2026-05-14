"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ShieldCheck, AlertTriangle } from "lucide-react";

// --- TiltCard Reusable Logic ---
const TiltCard = ({ children, className, glowColor }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-[#0B0F19]/80 rounded-2xl z-0 backdrop-blur-xl border border-white/5 transition-colors group-hover:border-white/20" />
      
      {/* Background SVG Grid */}
      <div className="absolute inset-0 z-0 opacity-10 overflow-hidden rounded-2xl pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
        </svg>
      </div>

      {/* Laser Scanner */}
      <div className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] shadow-[0_0_10px_currentColor] z-0 rounded-2xl ${glowColor}`} />

      {/* Content */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default function DafoMatrix() {
  const cards = [
    {
      id: "fortalezas",
      title: "Fortalezas",
      icon: <ShieldCheck className="w-8 h-8 text-[#00F0FF]" />,
      content: "Agilidad estructural, altos conocimientos técnicos del equipo fundador, metodología de trabajo 100% cloud, costes fijos bajos (Lean Startup).",
      color: "from-[#00F0FF]/20 to-transparent",
      glowColor: "text-[#00F0FF] bg-[#00F0FF]",
      delay: 0
    },
    {
      id: "oportunidades",
      title: "Oportunidades",
      icon: <ArrowUpRight className="w-8 h-8 text-[#8A2BE2]" />,
      content: "Subvenciones gubernamentales a la digitalización, alta demanda de optimización de procesos, consolidación del teletrabajo.",
      color: "from-[#8A2BE2]/20 to-transparent",
      glowColor: "text-[#8A2BE2] bg-[#8A2BE2]",
      delay: 0.1
    },
    {
      id: "debilidades",
      title: "Debilidades",
      icon: <ArrowDownRight className="w-8 h-8 text-orange-400" />,
      content: "Marca de nueva creación sin historial previo en el mercado, equipo humano inicialmente reducido.",
      color: "from-orange-400/20 to-transparent",
      glowColor: "text-orange-400 bg-orange-400",
      delay: 0.2
    },
    {
      id: "amenazas",
      title: "Amenazas",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      content: "Rápida evolución de las herramientas de IA que exige formación continua, aparición de nuevos competidores de bajo coste en otros continentes.",
      color: "from-red-500/20 to-transparent",
      glowColor: "text-red-500 bg-red-500",
      delay: 0.3
    }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto perspective-[2000px]" id="dafo">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: card.delay }}
          >
            <TiltCard glowColor={card.glowColor}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`} />

              <div className="flex items-center mb-6">
                <div className="p-3 bg-black/40 rounded-xl mr-4 backdrop-blur-md border border-white/10">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-wide">{card.title}</h3>
              </div>

              <div className="h-[100px]">
                <p className="text-gray-300 leading-relaxed pt-2 border-t border-white/10 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {card.content}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </section>
  );
}
