"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Target, 
  Sparkles, 
  Globe, 
  LayoutGrid, 
  Megaphone, 
  Users, 
  Settings, 
  TrendingUp, 
  Rocket, 
  Bot
} from "lucide-react";

// --- 3D Floating Tilt Card ---
const TiltBlock = ({ children, onClick, glow, accentColor }: { children: React.ReactNode; onClick: () => void; glow: string; accentColor: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glowOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.15, 0, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group cursor-pointer rounded-2xl w-full ${glow}`}
    >
      {/* Shadow under the card to enhance floating feel */}
      <div className="absolute -bottom-2 left-[10%] right-[10%] h-6 bg-black/40 rounded-[50%] blur-xl group-hover:bg-black/60 transition-all duration-500" />

      {/* Card base — dark glass */}
      <div className="absolute inset-0 bg-[#0d1220]/90 rounded-2xl backdrop-blur-xl border border-white/[0.08] transition-all duration-500 group-hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" />
      
      {/* Top edge highlight */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Inner glow on hover */}
      <motion.div 
        style={{ opacity: glowOpacity }} 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentColor === 'cyan' ? 'from-[#00F0FF]/10' : 'from-[#8A2BE2]/10'} to-transparent pointer-events-none`}
      />

      {/* Floating Content — translateZ for real 3D pop */}
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 px-5 py-4 flex items-center gap-4">
        {children}
      </div>
    </motion.div>
  );
};

export default function NavigableIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const sections = [
    { id: "filosofia", title: "Filosofía y Valores", icon: Target, accent: "cyan" as const },
    { id: "propuesta", title: "Propuesta de Valor", icon: Sparkles, accent: "purple" as const },
    { id: "mercado", title: "Mercado y Competencia", icon: Globe, accent: "cyan" as const },
    { id: "dafo", title: "Análisis DAFO", icon: LayoutGrid, accent: "purple" as const },
    { id: "marketing", title: "Estrategia Marketing", icon: Megaphone, accent: "cyan" as const },
    { id: "equipo", title: "Equipo y Organigrama", icon: Users, accent: "purple" as const },
    { id: "operaciones", title: "Operaciones y Legal", icon: Settings, accent: "cyan" as const },
    { id: "finanzas", title: "Plan Financiero", icon: TrendingUp, accent: "purple" as const },
    { id: "puesta-en-marcha", title: "Roadmap", icon: Rocket, accent: "cyan" as const },
    { id: "chatbot", title: "Demo IA", icon: Bot, accent: "purple" as const },
  ];

  const getColor = (accent: "cyan" | "purple") => accent === "cyan" ? "#00F0FF" : "#8A2BE2";
  const getGlow = (accent: "cyan" | "purple") => accent === "cyan" 
    ? "hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]" 
    : "hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]";

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative overflow-hidden perspective-[2000px]" id="indice">
      {/* === Animated Background === */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-40 w-[600px] h-[600px] bg-[#00F0FF]/8 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-20 -right-40 w-[600px] h-[600px] bg-[#8A2BE2]/8 rounded-full blur-[150px]" 
        />
        
        {/* Subtle moving grid */}
        <motion.div 
          animate={{ y: [0, 40] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-[200%] -top-full opacity-[0.025]"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="nav-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nav-grid)" />
          </svg>
        </motion.div>
      </div>

      {/* === Title === */}
      <div className="text-center mb-14 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Índice <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Estratégico</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Navega a través de los módulos clave de nuestra propuesta.
        </p>
      </div>

      {/* === Timeline Structure === */}
      <div className="relative max-w-3xl mx-auto" ref={containerRef}>
        {/* Central spine track (dim background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full hidden md:block" />
        {/* Animated gradient fill */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#00F0FF] via-[#8A2BE2] to-[#00F0FF] -translate-x-1/2 rounded-full hidden md:block"
        />
        {/* Glow behind the spine */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[6px] bg-gradient-to-b from-[#00F0FF]/40 via-[#8A2BE2]/40 to-[#00F0FF]/40 -translate-x-1/2 rounded-full hidden md:block blur-sm"
        />

        <div className="flex flex-col gap-5 md:gap-3 relative z-10">
          {sections.map((section, index) => {
            const isLeft = index % 2 === 0;
            const color = getColor(section.accent);

            return (
              <div 
                key={section.id} 
                className={`relative flex items-center w-full md:min-h-[72px] ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* === Card Side === */}
                <div className="w-full md:w-[calc(50%-28px)] pl-12 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.04 }}
                  >
                    {/* Floating wrapper */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <TiltBlock onClick={() => handleScroll(section.id)} glow={getGlow(section.accent)} accentColor={section.accent}>
                        <div 
                          className="p-2.5 rounded-xl border transition-all duration-500 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${color}10`,
                            borderColor: `${color}25`,
                          }}
                        >
                          <section.icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="text-[15px] font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 font-heading">
                          {section.title}
                        </span>
                      </TiltBlock>
                    </motion.div>
                  </motion.div>
                </div>

                {/* === Center Connector === */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  {/* Dot on the spine */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: index * 0.04 }}
                    className="w-2.5 h-2.5 rounded-full relative"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${color}, 0 0 4px ${color}` 
                    }}
                  />
                </div>

                {/* === Horizontal Connector Line (Desktop only) === */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.4, ease: "easeOut" }}
                  className="hidden md:block absolute top-1/2 -translate-y-1/2 h-[1.5px] z-10"
                  style={{
                    background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, ${color}, ${color}40)`,
                    boxShadow: `0 0 8px ${color}50`,
                    width: '28px',
                    left: isLeft ? 'calc(50% - 28px)' : '50%',
                    transformOrigin: isLeft ? 'right' : 'left',
                  }}
                />
                {/* === Horizontal Connector Line (Mobile) === */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.4, ease: "easeOut" }}
                  className="md:hidden absolute top-1/2 -translate-y-1/2 h-[1.5px] z-10"
                  style={{
                    background: `linear-gradient(to right, ${color}, ${color}40)`,
                    boxShadow: `0 0 8px ${color}50`,
                    width: '24px',
                    left: '20px',
                    transformOrigin: 'left',
                  }}
                />

                {/* === Empty spacer on the opposite side (desktop) === */}
                <div className="hidden md:block md:w-[calc(50%-28px)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
