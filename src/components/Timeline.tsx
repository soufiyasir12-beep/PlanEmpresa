"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { FileText, CheckCircle, PenTool, Home } from "lucide-react";

// --- TiltCard Reusable Logic ---
const TiltCard = ({ children, className }: any) => {
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
      
      {/* Content */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full p-6">
        {children}
      </div>
    </motion.div>
  );
};

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
    <section className="py-24 px-4 overflow-hidden perspective-[2000px]" id="puesta-en-marcha">
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
                  <TiltCard className={`${milestone.align === "left" ? "group-hover:box-glow-cyan" : "group-hover:box-glow-purple"}`}>
                    <span className={`text-sm font-bold uppercase tracking-wider ${milestone.align === "left" ? "text-[#00F0FF]" : "text-[#8A2BE2]"}`}>
                      {milestone.week}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3 text-white">{milestone.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{milestone.desc}</p>
                  </TiltCard>
                </motion.div>

                {/* Center Icon */}
                <div className="absolute left-[50px] md:left-1/2 w-12 h-12 bg-[#0B0F19] border-2 border-white/20 rounded-full flex items-center justify-center -translate-x-1/2 mt-6 md:mt-0 z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-125 hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_#00F0FF]">
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
