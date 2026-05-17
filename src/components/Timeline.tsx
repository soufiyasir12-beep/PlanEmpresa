"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, CheckCircle, PenTool, Home } from "lucide-react";

// Floating particles for the background
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 2 === 0 ? "#00F0FF" : "#8A2BE2",
          opacity: 0,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0, 0.4, 0],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 6,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lightPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const milestones = [
    {
      week: "Semana 1",
      title: "Identidad Legal",
      desc: "Solicitud de Certificación Negativa de Nombre al RMC y apertura de cuenta bancaria corporativa para desembolso inicial.",
      icon: <FileText className="w-6 h-6 text-[#00F0FF]" />,
      align: "left"
    },
    {
      week: "Semana 2",
      title: "Formalización Notarial",
      desc: "Firma de Escrituras ante Notario, redacción de Estatutos y Solicitud del NIF Provisional en Hacienda.",
      icon: <PenTool className="w-6 h-6 text-[#8A2BE2]" />,
      align: "right"
    },
    {
      week: "Semana 3",
      title: "Registro Mercantil",
      desc: "Liquidación del Impuesto de Transmisiones e inscripción de la escritura en el Registro Mercantil de Sevilla.",
      icon: <CheckCircle className="w-6 h-6 text-[#00F0FF]" />,
      align: "left"
    },
    {
      week: "Semana 4",
      title: "Operativa y Alta",
      desc: "Alta en IAE, RETA, obtención del Certificado Digital FNMT y despliegue final de la infraestructura web.",
      icon: <Home className="w-6 h-6 text-[#8A2BE2]" />,
      align: "right"
    }
  ];

  return (
    <section className="py-24 px-4 overflow-hidden relative" id="puesta-en-marcha">
      
      {/* ===== BACKGROUND SVG DECORATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="timeline-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#00F0FF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#timeline-dots)" />
        </svg>

        {/* Diagonal Accent Lines */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
          <motion.line x1="200" y1="0" x2="0" y2="200" stroke="#8A2BE2" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2 }} />
          <motion.line x1="200" y1="40" x2="40" y2="200" stroke="#8A2BE2" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }} />
          <motion.line x1="200" y1="80" x2="80" y2="200" stroke="#8A2BE2" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.6 }} />
        </svg>
        <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
          <motion.line x1="0" y1="0" x2="200" y2="200" stroke="#00F0FF" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2 }} />
          <motion.line x1="0" y1="40" x2="160" y2="200" stroke="#00F0FF" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }} />
          <motion.line x1="0" y1="80" x2="120" y2="200" stroke="#00F0FF" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.6 }} />
        </svg>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#00F0FF]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* ===== CONTENT ===== */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-heading"
          >
            Puesta en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Marcha</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Sprint cronológico de 4 semanas para el lanzamiento oficial.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-[50px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Animated Line */}
          <motion.div
            className="absolute left-[50px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#00F0FF] to-[#8A2BE2] -translate-x-1/2 origin-top shadow-[0_0_15px_#00F0FF]"
            style={{ height: lineHeight }}
          />

          {/* Descending Glowing Point */}
          <motion.div
            className="absolute left-[50px] md:left-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#00F0FF] -translate-x-1/2 -mt-2 z-20"
            style={{ top: lightPosition }}
          />

          {/* Milestones */}
          <div className="space-y-24 relative z-10">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between ${milestone.align === "right" ? "md:flex-row-reverse" : ""}`}>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: milestone.align === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-[45%] pl-[80px] md:pl-0 ${milestone.align === "left" ? "md:text-right" : "md:text-left"}`}
                >
                  <div className={`glass p-6 rounded-2xl border ${milestone.align === "left" ? "border-[#00F0FF]/30 hover:border-[#00F0FF]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]" : "border-[#8A2BE2]/30 hover:border-[#8A2BE2]/60 hover:shadow-[0_0_25px_rgba(138,43,226,0.1)]"} group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
                    
                    {/* Inner card corner accent */}
                    <div className={`absolute top-0 ${milestone.align === "left" ? "right-0" : "left-0"} w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d={milestone.align === "left" ? "M 48 0 L 48 48 L 0 48" : "M 0 0 L 0 48 L 48 48"} stroke={milestone.align === "left" ? "#00F0FF" : "#8A2BE2"} strokeWidth="1" opacity="0.3" />
                      </svg>
                    </div>

                    {/* Hover sweep reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className={`text-sm font-bold uppercase tracking-wider ${milestone.align === "left" ? "text-[#00F0FF]" : "text-[#8A2BE2]"}`}>
                      {milestone.week}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{milestone.desc}</p>
                  </div>
                </motion.div>

                {/* Center Icon */}
                <div className={`absolute left-[50px] md:left-1/2 w-12 h-12 bg-[#0B0F19] border-2 border-white/20 rounded-full flex items-center justify-center -translate-x-1/2 mt-6 md:mt-0 z-10 transition-all duration-500 hover:scale-125 ${milestone.align === "left" ? "hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_#00F0FF]" : "hover:border-[#8A2BE2]/50 hover:shadow-[0_0_20px_#8A2BE2]"}`}>
                  {milestone.icon}
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
