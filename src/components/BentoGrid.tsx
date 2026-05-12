"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Zap, Server } from "lucide-react";

export default function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10" id="propuesta">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Propuesta de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Valor</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Soluciones de IA accesibles, escalables y adaptadas a tu sector.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
      >
        {/* Machine Learning - Large Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 col-span-1 md:col-span-2 relative overflow-hidden group hover:box-glow-purple transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} d="M3 3v18h18" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/20 flex items-center justify-center mb-6">
              <Cpu className="text-[#8A2BE2] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Análisis Predictivo de Datos</h3>
            <p className="text-gray-300">
              Machine Learning aplicado a tus datos históricos para anticipar tendencias de ventas, optimizar inventarios y mejorar la toma de decisiones empresariales.
            </p>
          </div>
        </motion.div>

        {/* RPA Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 relative overflow-hidden group hover:box-glow-cyan transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/20 flex items-center justify-center">
              <Zap className="text-[#00F0FF] w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Automatización RPA</h3>
              <p className="text-gray-400 text-sm">
                Reducción drástica de costes operativos mediante la estructuración de flujos de trabajo automáticos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chatbots Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 relative overflow-hidden group hover:box-glow-cyan transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.rect initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} x="3" y="11" width="18" height="10" rx="2" />
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} cx="12" cy="5" r="2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M12 7v4" />
              <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5 }} x1="8" y1="16" x2="8" y2="16" />
              <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5 }} x1="16" y1="16" x2="16" y2="16" />
            </svg>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/20 flex items-center justify-center">
              <Bot className="text-[#00F0FF] w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Chatbots Inteligentes</h3>
              <p className="text-gray-400 text-sm">
                IA Generativa para atención al cliente 24/7 y resolución automática de consultas repetitivas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Strategy Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 col-span-1 md:col-span-2 relative overflow-hidden group hover:box-glow-purple transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} cx="12" cy="12" r="10" />
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} cx="12" cy="12" r="6" />
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#8A2BE2]/20 flex items-center justify-center mb-6">
              <Server className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Despliegue &quot;Llave en Mano&quot;</h3>
            <p className="text-gray-300">
              Nos encargamos de toda la integración técnica. Desde la configuración de la infraestructura cloud hasta la implementación en tus sistemas actuales.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
