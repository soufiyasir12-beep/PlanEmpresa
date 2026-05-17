"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Users, Megaphone, Wrench, Briefcase, ShieldAlert, Zap } from "lucide-react";

// --- TiltCard Reusable Logic ---
const TiltCard = ({ children, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      className={`relative group rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-[#0B0F19]/90 rounded-2xl z-0 backdrop-blur-xl border border-white/5 transition-colors group-hover:border-white/20 shadow-xl" />
      
      {/* Content */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full p-6 flex flex-col items-center text-center">
        {children}
      </div>
    </motion.div>
  );
};

export default function Organigram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" as const } },
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative perspective-[2000px]" id="equipo">
      
      {/* ===== BACKGROUND SVG DECORATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hexagonal Dot Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-dots" width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <circle cx="25" cy="21.65" r="1.5" fill="#8A2BE2" />
              <circle cx="0" cy="0" r="1.5" fill="#8A2BE2" />
              <circle cx="50" cy="0" r="1.5" fill="#8A2BE2" />
              <circle cx="0" cy="43.3" r="1.5" fill="#8A2BE2" />
              <circle cx="50" cy="43.3" r="1.5" fill="#8A2BE2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-dots)" />
        </svg>

        {/* Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-radial from-[#8A2BE2]/6 to-transparent rounded-full blur-3xl" />

        {/* Pulsing corner nodes */}
        <motion.div className="absolute top-24 right-12 w-2 h-2 rounded-full bg-[#00F0FF]"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-[#8A2BE2]"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
        <motion.div className="absolute top-1/2 right-24 w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
          animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.8 }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-heading"
          >
            Estructura y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Equipo</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Un equipo ágil y altamente especializado preparado para escalar.
          </p>
        </div>

        <motion.div
          className="relative flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* SVG Lines connecting nodes */}
          <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
            <svg className="w-full h-full" viewBox="0 0 1024 400" preserveAspectRatio="xMidYMin slice" style={{ minHeight: "400px" }}>
              {/* Vertical line from CEO */}
              <motion.path id="path1" d="M 512 100 L 512 180" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5 5" fill="none" variants={lineVariants} />
              {/* Horizontal line distributing to departments */}
              <motion.path id="path2" d="M 170 180 L 854 180" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5 5" fill="none" variants={lineVariants} />
              {/* Vertical lines to departments */}
              <motion.path id="path3" d="M 170 180 L 170 220" stroke="var(--color-neon-purple)" strokeWidth="2" strokeDasharray="5 5" fill="none" variants={lineVariants} />
              <motion.path id="path4" d="M 512 180 L 512 220" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5 5" fill="none" variants={lineVariants} />
              <motion.path id="path5" d="M 854 180 L 854 220" stroke="var(--color-neon-purple)" strokeWidth="2" strokeDasharray="5 5" fill="none" variants={lineVariants} />
              
              {/* Animated Data Packets (Glowing Dots) */}
              <circle r="4" fill="#00F0FF" filter="drop-shadow(0 0 5px #00F0FF)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 512 100 L 512 180" />
              </circle>
              <circle r="4" fill="#8A2BE2" filter="drop-shadow(0 0 5px #8A2BE2)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 512 180 L 170 180 L 170 220" />
              </circle>
              <circle r="4" fill="#00F0FF" filter="drop-shadow(0 0 5px #00F0FF)">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 512 180 L 512 220" />
              </circle>
              <circle r="4" fill="#8A2BE2" filter="drop-shadow(0 0 5px #8A2BE2)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 512 180 L 854 180 L 854 220" />
              </circle>
            </svg>
          </div>

          {/* CEO Node */}
          <motion.div variants={itemVariants} className="z-10 mb-16 md:mb-28">
            <TiltCard className="box-glow-cyan">
              <div className="w-16 h-16 bg-[#00F0FF]/20 rounded-full flex items-center justify-center mb-4 border border-[#00F0FF]/50 absolute -top-8 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <User className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-white">Yasir Soufi Hdidou</h3>
              <p className="text-[#00F0FF] font-medium mt-1">CEO & Founder</p>
            </TiltCard>
          </motion.div>

          {/* Departments Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {/* Dept 1 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="group-hover:box-glow-purple">
                <div className="w-12 h-12 bg-[#8A2BE2]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(138,43,226,0.2)]">
                  <Users className="w-6 h-6 text-[#8A2BE2]" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">Dpto. Ventas</h4>
                <p className="text-sm text-gray-400">Directores de Ventas y Closers</p>
              </TiltCard>
            </motion.div>

            {/* Dept 2 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="group-hover:box-glow-cyan">
                <div className="w-12 h-12 bg-[#00F0FF]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  <Wrench className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">Prod. Técnica</h4>
                <p className="text-sm text-gray-400">Integradores API y Devs Full-Stack</p>
              </TiltCard>
            </motion.div>

            {/* Dept 3 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="group-hover:box-glow-purple">
                <div className="w-12 h-12 bg-[#8A2BE2]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(138,43,226,0.2)]">
                  <Megaphone className="w-6 h-6 text-[#8A2BE2]" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">Dpto. Marketing IA</h4>
                <p className="text-sm text-gray-400">Prompters y Especialistas en IA</p>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>

        {/* --- NUEVA SECCIÓN: RECURSOS HUMANOS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 pt-16 border-t border-white/10 relative"
        >
          {/* Header RRHH */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 font-heading">Políticas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">RRHH</span></h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Gestión del talento, contratación y prevención de riesgos laborales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Modelo Laboral */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full hover:box-glow-cyan bg-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00F0FF]/20 rounded-lg">
                    <Briefcase className="w-6 h-6 text-[#00F0FF]" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Modelo Laboral</h4>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-2">Remote-First</div>
                  <p className="text-sm text-gray-300">Operativa 100% remota con remuneración por objetivos.</p>
                  <p className="text-sm text-gray-300">Formación continua y obligatoria en nuevas herramientas de IA.</p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Contratación */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full hover:box-glow-purple bg-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#8A2BE2]/20 rounded-lg">
                    <Zap className="w-6 h-6 text-[#8A2BE2]" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Contratación</h4>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-2">Lean Startup</div>
                  <p className="text-sm text-gray-300">Inicio con profesionales B2B (Freelancers altamente cualificados).</p>
                  <p className="text-sm text-gray-300">Escalado a contratos indefinidos al superar hitos de MRR establecidos.</p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Prevención PRL */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full hover:box-glow-cyan bg-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00F0FF]/20 rounded-lg">
                    <ShieldAlert className="w-6 h-6 text-[#00F0FF]" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Prevención (PRL)</h4>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-2">Foco Tecnológico</div>
                  <ul className="text-sm text-gray-300 list-disc pl-4 space-y-1">
                    <li>Ergonomía visual y salud postural.</li>
                    <li>Protocolos estrictos de ciberseguridad.</li>
                    <li>Prevención proactiva del estrés tecnológico (burnout).</li>
                  </ul>
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
