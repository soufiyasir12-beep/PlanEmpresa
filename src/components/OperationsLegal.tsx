"use client";

import { motion } from "framer-motion";
import { Scale, Cloud, Server, Database } from "lucide-react";

export default function OperationsLegal() {
  const nodes = [
    {
      id: "legal",
      title: "S.L.",
      subtitle: "Forma Jurídica",
      desc: "Protección del patrimonio personal ante datos sensibles B2B. Proyecta solvencia comercial.",
      icon: <Scale className="w-6 h-6 text-[#00F0FF]" />,
      color: "#00F0FF"
    },
    {
      id: "cloud",
      title: "Cloud",
      subtitle: "Plan de Producción",
      desc: "Operativa 100% en la nube, permitiendo trabajo asíncrono y deslocalizado.",
      icon: <Cloud className="w-6 h-6 text-[#8A2BE2]" />,
      color: "#8A2BE2"
    },
    {
      id: "providers",
      title: "Proveedores",
      subtitle: "Infraestructura",
      desc: "AWS/Google Cloud para hosting, OpenAI para APIs core y Vercel para despliegue.",
      icon: <Server className="w-6 h-6 text-[#00F0FF]" />,
      color: "#00F0FF"
    },
    {
      id: "inventory",
      title: "Inventario",
      subtitle: "Gestión Digital",
      desc: "Cero almacén físico. Control estricto de repositorios en GitHub y gestión de tokens API.",
      icon: <Database className="w-6 h-6 text-[#8A2BE2]" />,
      color: "#8A2BE2"
    }
  ];

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3, 
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    }
  };

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto relative overflow-hidden" id="operaciones">
      <div className="text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 font-heading"
        >
          Operaciones y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Legal</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Estructura organizativa ágil, segura y nativa digital.
        </p>
      </div>

      <div className="relative z-10 hidden md:block mt-12 mb-32 h-64">
        {/* Animated connecting line */}
        <svg className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 z-0" style={{ overflow: "visible" }}>
          <motion.path
            d="M 10% 50% C 30% 50%, 30% 20%, 50% 50% C 70% 80%, 70% 50%, 90% 50%"
            fill="none"
            stroke="url(#gradient-line)"
            strokeWidth="3"
            strokeDasharray="10 5"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
          
          {/* Animated packet traveling along the path */}
          <circle r="4" fill="#FFF" filter="drop-shadow(0 0 8px #FFF)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 10% 50% C 30% 50%, 30% 20%, 50% 50% C 70% 80%, 70% 50%, 90% 50%" />
          </circle>
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 flex justify-between items-center px-[5%]">
          {nodes.map((node, index) => {
            // Adjust vertical position for wave effect
            const topOffset = index === 1 ? "-60px" : index === 2 ? "60px" : "0px";
            
            return (
              <motion.div
                key={node.id}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.3 }}
                className="relative group w-48 flex flex-col items-center text-center"
                style={{ top: topOffset }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-[#0B0F19] border-2 border-[${node.color}]/50 shadow-[0_0_15px_${node.color}40] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform`}>
                  {node.icon}
                  {/* Outer pulse */}
                  <div className={`absolute inset-0 rounded-2xl border border-[${node.color}] opacity-0 group-hover:animate-ping`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{node.title}</h3>
                <span className={`text-xs uppercase tracking-widest font-bold mb-3`} style={{ color: node.color }}>{node.subtitle}</span>
                
                {/* Popover description on hover */}
                <div className="absolute top-full mt-4 w-64 glass p-4 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-2xl">
                  <p className="text-sm text-gray-300">{node.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile view (Stack) */}
      <div className="md:hidden space-y-6">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="glass p-6 rounded-2xl border border-white/10 flex items-start gap-4"
          >
            <div className={`p-3 rounded-xl bg-[${node.color}]/10 border border-[${node.color}]/30 shrink-0`}>
              {node.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{node.title}</h3>
              <span className={`text-xs uppercase tracking-widest font-bold mb-2 block`} style={{ color: node.color }}>{node.subtitle}</span>
              <p className="text-sm text-gray-400">{node.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
