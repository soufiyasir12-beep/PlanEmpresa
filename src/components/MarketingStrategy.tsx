"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Rocket, Megaphone, Headset } from "lucide-react";

const tabs = [
  {
    id: "pricing",
    label: "Pricing",
    icon: <Tag className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-4">Modelo de Precios Híbrido</h3>
        <p className="text-gray-300 leading-relaxed">
          Estructura de costes diseñada para reducir la barrera de entrada a las PYMEs, asegurando ingresos recurrentes para la escalabilidad.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-4 rounded-xl">
            <h4 className="text-[#00F0FF] font-bold mb-2">Setup Inicial</h4>
            <p className="text-2xl font-bold text-white">500€ - 4.000€</p>
            <p className="text-sm text-gray-400 mt-2">Pago por instalación y desarrollo a medida.</p>
          </div>
          <div className="bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 p-4 rounded-xl">
            <h4 className="text-[#8A2BE2] font-bold mb-2">Suscripción</h4>
            <p className="text-2xl font-bold text-white">Desde 200€/mes</p>
            <p className="text-sm text-gray-400 mt-2">Mantenimiento, optimización y costes de servidores.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "distribution",
    label: "Distribución",
    icon: <Rocket className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-4">Marketing Inbound</h3>
        <p className="text-gray-300 leading-relaxed">
          Atracción de clientes mediante demostraciones reales del valor aportado.
        </p>
        <ul className="space-y-4 mt-6">
          <li className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
              <span className="w-2 h-2 block bg-[#00F0FF] rounded-full" />
            </div>
            <div>
              <strong className="text-white">Contenido de Alto Valor:</strong>
              <p className="text-sm text-gray-400">Casos de estudio demostrando las capacidades de la IA.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
              <span className="w-2 h-2 block bg-[#8A2BE2] rounded-full" />
            </div>
            <div>
              <strong className="text-white">Lead Magnet:</strong>
              <p className="text-sm text-gray-400">Auditoría gratuita de procesos automatizables.</p>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "communication",
    label: "Comunicación",
    icon: <Megaphone className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-4">Estrategia Outbound</h3>
        <p className="text-gray-300 leading-relaxed">
          Prospección activa para llegar directamente a los tomadores de decisiones.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 flex items-center justify-center">
              <span className="text-[#00F0FF] font-bold">in</span>
            </div>
            <span className="text-sm text-gray-300">LinkedIn B2B</span>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center">
              <span className="text-[#8A2BE2] font-bold">@</span>
            </div>
            <span className="text-sm text-gray-300">Cold Emails</span>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 flex items-center justify-center">
              <span className="text-[#00F0FF] font-bold">#</span>
            </div>
            <span className="text-sm text-gray-300">Redes Sociales</span>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center">
              <span className="text-[#8A2BE2] font-bold">📞</span>
            </div>
            <span className="text-sm text-gray-300">Llamadas Directas</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "support",
    label: "Soporte",
    icon: <Headset className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-4">Atención al Cliente Omnicanal</h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          Utilizamos nuestra propia tecnología para brindar un soporte eficiente y escalable.
        </p>

        <div className="relative pl-8 border-l-2 border-white/10 space-y-8">
          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#0B0F19] border-2 border-[#00F0FF] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            </div>
            <h4 className="text-white font-bold">Nivel 1: Filtro IA</h4>
            <p className="text-sm text-gray-400 mt-1">Chatbots propios resuelven dudas comunes e incidencias de baja complejidad 24/7.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#0B0F19] border-2 border-[#8A2BE2] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#8A2BE2]" />
            </div>
            <h4 className="text-white font-bold">Nivel 2: Soporte Humano</h4>
            <p className="text-sm text-gray-400 mt-1">Escalado automático a técnicos especializados para problemas complejos o consultoría.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function MarketingStrategy() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative" id="marketing">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-[#8A2BE2]/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Estrategia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Marketing</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Cómo captamos, convertimos y fidelizamos a nuestros clientes.
        </p>
      </div>

      <div className="glass rounded-3xl border border-white/10 overflow-hidden relative z-10">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap md:flex-nowrap border-b border-white/10 bg-[#0B0F19]/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 relative transition-colors ${activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
            >
              {tab.icon}
              <span className="font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2] shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 md:p-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.content}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
