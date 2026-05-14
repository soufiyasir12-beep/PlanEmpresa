"use client";

import { motion, useInView, animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { PieChart, Wallet, Building, Users } from "lucide-react";

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
      <div className={`absolute inset-0 bg-[#0B0F19]/80 rounded-2xl z-0 backdrop-blur-xl border border-white/5 transition-colors group-hover:border-white/20`} />
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl z-0 ${glowColor}`} />
      
      {/* Content */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full p-5 flex items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          node.textContent = new Intl.NumberFormat('es-ES').format(Math.round(value)) + " €";
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef} className="tabular-nums font-bold">{from} €</span>;
}

export default function FinancialPlan() {
  const data = [
    { label: "Capital Social", amount: 1500, color: "#8A2BE2", icon: <Wallet className="w-5 h-5" />, glowColor: "bg-[#8A2BE2]" },
    { label: "Línea ICO", amount: 3000, color: "#00F0FF", icon: <Building className="w-5 h-5" />, glowColor: "bg-[#00F0FF]" },
    { label: "Micro-Inversor (FFF)", amount: 3000, color: "#3B82F6", icon: <Users className="w-5 h-5" />, glowColor: "bg-[#3B82F6]" },
  ];

  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto perspective-[2000px] relative" id="finanzas">
      
      {/* ===== BACKGROUND SVG DECORATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cross-Hair Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fin-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="40" y1="0" x2="40" y2="80" stroke="#00F0FF" strokeWidth="0.3" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="#00F0FF" strokeWidth="0.3" />
              <circle cx="40" cy="40" r="2" fill="none" stroke="#00F0FF" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fin-grid)" />
        </svg>

        {/* Concentric Rings behind the chart */}
        <svg className="absolute top-1/4 left-1/4 -translate-x-1/4 w-80 h-80 opacity-[0.04]" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="140" stroke="#8A2BE2" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="110" stroke="#00F0FF" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="80" stroke="#8A2BE2" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="50" stroke="#00F0FF" strokeWidth="0.5" />
        </svg>

        {/* Radial Glow */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-[#00F0FF]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-radial from-[#8A2BE2]/5 to-transparent rounded-full blur-3xl" />

        {/* Pulsing accent dots */}
        <motion.div className="absolute top-16 left-8 w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-12 w-1.5 h-1.5 rounded-full bg-[#8A2BE2]"
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
      </div>

      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Plan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Financiero</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Modelo Lean Startup con inversión inicial optimizada para máxima eficiencia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Animated Pie Chart / Ring */}
        <div className="relative flex justify-center items-center h-[300px]">
          <svg className="w-64 h-64 transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            {/* Background Ring */}
            <circle
              cx="128" cy="128" r="110"
              fill="transparent"
              stroke="#ffffff10"
              strokeWidth="20"
            />
            {/* Segments */}
            {data.map((item, index) => {
              // Calculate dash array and offset for each segment
              const circumference = 2 * Math.PI * 110;
              const percentage = item.amount / total;
              const dashLength = percentage * circumference;

              // Calculate offset based on previous segments
              const prevTotal = data.slice(0, index).reduce((acc, curr) => acc + curr.amount, 0);
              const prevPercentage = prevTotal / total;
              const dashOffset = -prevPercentage * circumference;

              return (
                <motion.circle
                  key={index}
                  cx="128" cy="128" r="110"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: dashOffset }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.5, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Inversión Total</span>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              <Counter from={0} to={total} duration={2} />
            </div>
          </div>
        </div>

        {/* Legend and Details */}
        <div className="space-y-6">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TiltCard glowColor={item.glowColor} className="border-l-4" style={{ borderLeftColor: item.color }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 shadow-inner" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-lg text-white">{item.label}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: item.color, textShadow: `0 0 10px ${item.color}40` }}>
                  <Counter from={0} to={item.amount} duration={1.5} />
                </div>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8 p-6 bg-gradient-to-br from-[#00F0FF]/10 to-[#8A2BE2]/10 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(138,43,226,0.15)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-lg">
              <PieChart className="w-6 h-6 text-[#00F0FF]" /> Proyección Año 1
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Ingresos proyectados de <span className="text-white font-bold text-lg">42.000 €</span> con un Beneficio Neto Previsto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00d0ff] font-bold text-lg">9.350 €</span>, reinvertido íntegramente en crecimiento orgánico.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
