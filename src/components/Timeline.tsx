"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, CheckCircle, PenTool, Home } from "lucide-react";

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
    <section className="py-24 px-4 overflow-hidden" id="puesta-en-marcha">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
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
            className="absolute left-[50px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#00F0FF] to-[#8A2BE2] -translate-x-1/2 origin-top"
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
                  <div className={`glass p-6 rounded-2xl border ${milestone.align === "left" ? "border-[#00F0FF]/30" : "border-[#8A2BE2]/30"}`}>
                    <span className={`text-sm font-bold uppercase tracking-wider ${milestone.align === "left" ? "text-[#00F0FF]" : "text-[#8A2BE2]"}`}>
                      {milestone.week}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.desc}</p>
                  </div>
                </motion.div>

                {/* Center Icon */}
                <div className="absolute left-[50px] md:left-1/2 w-12 h-12 bg-[#0B0F19] border-2 border-white/20 rounded-full flex items-center justify-center -translate-x-1/2 mt-6 md:mt-0 z-10">
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
