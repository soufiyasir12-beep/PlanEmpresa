"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Zap, Server } from "lucide-react";
import Image from "next/image";

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
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Propuesta de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Valor</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Soluciones de IA accesibles, escalables y adaptadas a tu sector con demostraciones visuales de nuestra tecnología.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
      >
        {/* Machine Learning - Large Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 col-span-1 md:col-span-2 relative overflow-hidden group hover:box-glow-purple transition-all duration-300">
          <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
            <Image src="/images/analytics.png" alt="Analytics Dashboard" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/40 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(138,43,226,0.5)]">
              <Cpu className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Análisis Predictivo de Datos</h3>
            <p className="text-gray-200">
              Machine Learning aplicado a tus datos históricos para anticipar tendencias de ventas, optimizar inventarios y mejorar la toma de decisiones empresariales.
            </p>
          </div>
        </motion.div>

        {/* RPA Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 relative overflow-hidden group hover:box-glow-cyan transition-all duration-300">
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Image src="/images/rpa.png" alt="RPA Dashboard" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/40" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Zap className="text-white w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Automatización RPA</h3>
              <p className="text-gray-300 text-sm drop-shadow-md">
                Reducción drástica de costes operativos mediante la estructuración de flujos de trabajo automáticos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chatbots Card */}
        <motion.div variants={item} className="glass rounded-3xl p-8 relative overflow-hidden group hover:box-glow-cyan transition-all duration-300">
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Image src="/images/chatbot.png" alt="Chatbot Interface" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/40" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Bot className="text-white w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Chatbots Inteligentes</h3>
              <p className="text-gray-300 text-sm drop-shadow-md">
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
