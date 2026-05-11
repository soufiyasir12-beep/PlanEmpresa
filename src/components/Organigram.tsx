"use client";

import { motion } from "framer-motion";
import { User, Users, Megaphone, Wrench } from "lucide-react";

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" as const } },
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative" id="equipo">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
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
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg className="w-full h-full" style={{ minHeight: "400px" }}>
              {/* Vertical line from CEO */}
              <motion.line x1="50%" y1="100" x2="50%" y2="180" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5,5" variants={lineVariants} />
              {/* Horizontal line distributing to departments */}
              <motion.line x1="20%" y1="180" x2="80%" y2="180" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5,5" variants={lineVariants} />
              {/* Vertical lines to departments */}
              <motion.line x1="20%" y1="180" x2="20%" y2="220" stroke="var(--color-neon-purple)" strokeWidth="2" strokeDasharray="5,5" variants={lineVariants} />
              <motion.line x1="50%" y1="180" x2="50%" y2="220" stroke="var(--color-neon-cyan)" strokeWidth="2" strokeDasharray="5,5" variants={lineVariants} />
              <motion.line x1="80%" y1="180" x2="80%" y2="220" stroke="var(--color-neon-purple)" strokeWidth="2" strokeDasharray="5,5" variants={lineVariants} />
            </svg>
          </div>

          {/* CEO Node */}
          <motion.div variants={itemVariants} className="z-10 mb-16 md:mb-28">
            <div className="glass px-8 py-6 rounded-2xl flex flex-col items-center border-[#00F0FF]/40 box-glow-cyan text-center relative">
              <div className="w-16 h-16 bg-[#00F0FF]/20 rounded-full flex items-center justify-center mb-4 border border-[#00F0FF]/50 absolute -top-8">
                <User className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Yasir Soufi Hdidou</h3>
              <p className="text-[#00F0FF] font-medium">CEO & Founder</p>
            </div>
          </motion.div>

          {/* Departments Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {/* Dept 1 */}
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl flex flex-col items-center border-[#8A2BE2]/30 hover:border-[#8A2BE2]/60 transition-colors text-center">
              <div className="w-12 h-12 bg-[#8A2BE2]/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#8A2BE2]" />
              </div>
              <h4 className="text-lg font-bold mb-2">Dpto. Ventas</h4>
              <p className="text-sm text-gray-400">Directores de Ventas y Closers</p>
            </motion.div>

            {/* Dept 2 */}
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl flex flex-col items-center border-[#00F0FF]/30 hover:border-[#00F0FF]/60 transition-colors text-center">
              <div className="w-12 h-12 bg-[#00F0FF]/20 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <h4 className="text-lg font-bold mb-2">Prod. Técnica</h4>
              <p className="text-sm text-gray-400">Integradores API y Devs Full-Stack</p>
            </motion.div>

            {/* Dept 3 */}
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl flex flex-col items-center border-[#8A2BE2]/30 hover:border-[#8A2BE2]/60 transition-colors text-center">
              <div className="w-12 h-12 bg-[#8A2BE2]/20 rounded-xl flex items-center justify-center mb-4">
                <Megaphone className="w-6 h-6 text-[#8A2BE2]" />
              </div>
              <h4 className="text-lg font-bold mb-2">Dpto. Marketing IA</h4>
              <p className="text-sm text-gray-400">Prompters y Especialistas en IA</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
