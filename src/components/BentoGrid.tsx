"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, Cpu, Zap, Server } from "lucide-react";
import Image from "next/image";

const TiltCard = ({ children, className, variants }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`glass rounded-3xl relative overflow-hidden group transition-colors duration-300 ${className}`}
    >
      {/* Animated Border Glow (Conic Gradient) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.8)_360deg)] animate-[border-spin_4s_linear_infinite]" />
      </div>
      {/* Inner background to mask the glow and only leave the border */}
      <div className="absolute inset-[1px] bg-[#0B0F19]/90 rounded-[23px] z-0 pointer-events-none transition-colors duration-300 backdrop-blur-xl" />

      {/* Content wrapper with 3D Pop out effect */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

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
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10 perspective-[2000px]" id="propuesta">
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
        <TiltCard variants={item} className="col-span-1 md:col-span-2 hover:box-glow-purple">
          <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl overflow-hidden -m-8 pointer-events-none">
            <Image src="/images/analytics.png" alt="Analytics Dashboard" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
          </div>
          <div className="flex-1" />
          <div className="relative z-10 flex flex-col justify-end" style={{ transform: "translateZ(20px)" }}>
            <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/40 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(138,43,226,0.5)]">
              <Cpu className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Análisis Predictivo de Datos</h3>
            <p className="text-gray-200">
              Machine Learning aplicado a tus datos históricos para anticipar tendencias de ventas, optimizar inventarios y mejorar la toma de decisiones empresariales.
            </p>
          </div>
        </TiltCard>

        {/* RPA Card */}
        <TiltCard variants={item} className="hover:box-glow-cyan">
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl overflow-hidden -m-8 pointer-events-none">
            <Image src="/images/rpa.png" alt="RPA Dashboard" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/40" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: "translateZ(20px)" }}>
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
        </TiltCard>

        {/* Chatbots Card */}
        <TiltCard variants={item} className="hover:box-glow-cyan">
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl overflow-hidden -m-8 pointer-events-none">
            <Image src="/images/chatbot.png" alt="Chatbot Interface" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/40" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: "translateZ(20px)" }}>
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
        </TiltCard>

        {/* Strategy Card */}
        <TiltCard variants={item} className="col-span-1 md:col-span-2 hover:box-glow-purple">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-60 transition-opacity pointer-events-none" style={{ transform: "translateZ(50px)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[border-spin_20s_linear_infinite]">
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} cx="12" cy="12" r="10" strokeDasharray="10 20" />
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} cx="12" cy="12" r="6" strokeDasharray="5 10" className="animate-[border-spin_10s_linear_infinite_reverse]" style={{ transformOrigin: "center" }} />
              <motion.circle initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div className="flex-1" />
          <div className="relative z-10 flex flex-col justify-end" style={{ transform: "translateZ(20px)" }}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#8A2BE2]/20 flex items-center justify-center mb-6">
              <Server className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Despliegue &quot;Llave en Mano&quot;</h3>
            <p className="text-gray-300">
              Nos encargamos de toda la integración técnica. Desde la configuración de la infraestructura cloud hasta la implementación en tus sistemas actuales.
            </p>
          </div>
        </TiltCard>

      </motion.div>
    </section>
  );
}
