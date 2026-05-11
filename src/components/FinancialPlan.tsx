"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PieChart, Wallet, Building, Users } from "lucide-react";

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
    { label: "Capital Social", amount: 1500, color: "#8A2BE2", icon: <Wallet className="w-5 h-5" /> },
    { label: "Línea ICO", amount: 3000, color: "#00F0FF", icon: <Building className="w-5 h-5" /> },
    { label: "Micro-Inversor (FFF)", amount: 3000, color: "#3B82F6", icon: <Users className="w-5 h-5" /> },
  ];

  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="finanzas">
      <div className="text-center mb-16">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Animated Pie Chart / Ring */}
        <div className="relative flex justify-center items-center h-[300px]">
          <svg className="w-64 h-64 transform -rotate-90">
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
            <span className="text-gray-400 text-sm mb-1">Inversión Total</span>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">
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
              className="glass p-5 rounded-2xl flex items-center justify-between border-l-4"
              style={{ borderLeftColor: item.color }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <span className="font-semibold text-lg">{item.label}</span>
              </div>
              <div className="text-xl" style={{ color: item.color }}>
                <Counter from={0} to={item.amount} duration={1.5} />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-gradient-to-r from-[#00F0FF]/10 to-[#8A2BE2]/10 rounded-xl border border-white/10"
          >
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#00F0FF]" /> Proyección Año 1
            </h4>
            <p className="text-sm text-gray-300">
              Ingresos proyectados de <span className="text-white font-bold">42.000 €</span> con un Beneficio Neto Previsto de <span className="text-[#00F0FF] font-bold">9.350 €</span>, reinvertido íntegramente en crecimiento.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
