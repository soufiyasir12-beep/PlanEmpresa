"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { Building2, Store, HeartPulse, GraduationCap, Truck, ArrowRight } from "lucide-react";

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
      className={`relative group rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 bg-[#0B0F19]/90 rounded-3xl z-0 backdrop-blur-xl border border-white/5 transition-colors group-hover:border-white/20 shadow-xl overflow-hidden">
         {/* Animated Border Glow (Conic Gradient) */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.4)_360deg)] animate-[border-spin_4s_linear_infinite]" />
        </div>
        <div className="absolute inset-[1px] bg-[#0B0F19]/95 rounded-[23px] z-0 pointer-events-none" />
      </div>
      
      {/* Content */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full p-8 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const Badge = ({ icon, text, color }: { icon: React.ReactNode, text: string, color: "cyan" | "purple" }) => {
  const bgClass = color === "cyan" ? "bg-[#00F0FF]/10 border-[#00F0FF]/30 text-[#00F0FF]" : "bg-[#8A2BE2]/10 border-[#8A2BE2]/30 text-[#8A2BE2]";
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bgClass} shadow-sm backdrop-blur-sm text-sm font-medium`}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default function MarketCompetition() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative perspective-[2000px]" id="mercado">
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-[#00F0FF]/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-[#8A2BE2]/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Mercado y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Competencia</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Análisis del entorno B2B y nuestro posicionamiento estratégico.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Market (Large Card) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <TiltCard className="h-full hover:box-glow-cyan">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <Building2 className="text-[#00F0FF] w-7 h-7" /> Mercado B2B Objetivo
            </h3>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Orientado a <strong>PYMEs (5 a 50 empleados)</strong> con alta demanda impulsada por subvenciones europeas a la digitalización. Nos enfocamos en empresas que necesitan integradores reales, no solo software en bruto.
            </p>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Sectores Prioritarios</h4>
              <div className="flex flex-wrap gap-3">
                <Badge icon={<Truck className="w-4 h-4" />} text="Logística" color="cyan" />
                <Badge icon={<Store className="w-4 h-4" />} text="Retail" color="purple" />
                <Badge icon={<HeartPulse className="w-4 h-4" />} text="Salud" color="cyan" />
                <Badge icon={<GraduationCap className="w-4 h-4" />} text="Educación" color="purple" />
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 border-l-4 border-l-[#00F0FF]">
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold">Foco Local:</span> El tejido empresarial local en Sevilla y Andalucía carece de servicios de integración tecnológica adaptados a su tamaño.
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* Right Column - Competition & Advantage (Stacked Cards) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex-1">
            <TiltCard className="h-full hover:box-glow-purple">
              <h3 className="text-xl font-bold mb-4 text-white">Competencia Actual</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <p><strong className="text-gray-300">Consultoras Tradicionales:</strong> Precios inasumibles para el presupuesto de una PYME promedio.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <p><strong className="text-gray-300">SaaS Internacionales:</strong> Requieren conocimientos técnicos avanzados por parte del cliente para su implementación.</p>
                </li>
              </ul>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1">
            <TiltCard className="h-full hover:box-glow-cyan bg-gradient-to-br from-[#00F0FF]/5 to-transparent">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                Nuestra Ventaja <ArrowRight className="w-5 h-5 text-[#00F0FF]" />
              </h3>
              <p className="text-gray-300">
                Ofrecemos un servicio <strong>&quot;llave en mano&quot;</strong> y atención hiper-personalizada. 
                Construimos el puente entre la IA avanzada y la empresa local, encargándonos de toda la fricción técnica.
              </p>
            </TiltCard>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
