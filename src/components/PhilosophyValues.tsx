"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { User, MapPin, Target, Leaf } from "lucide-react";

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
      className={`relative group rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-[#0B0F19]/90 rounded-2xl z-0 backdrop-blur-xl border border-white/5 transition-colors group-hover:border-white/20 shadow-xl" />
      
      {/* Content */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export default function PhilosophyValues() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const values = [
    {
      id: "entrepreneur",
      title: "El Emprendedor",
      desc: "Proyecto liderado por Yasir Soufi Hdidou. Perfil técnico SMR enfocado en automatización escalable.",
      icon: <User className="w-8 h-8 text-[#00F0FF]" />,
      glowColor: "box-glow-cyan"
    },
    {
      id: "location",
      title: "Sede",
      desc: "Base en Sevilla con operativa híbrida y remota a nivel nacional para máxima agilidad.",
      icon: <MapPin className="w-8 h-8 text-[#8A2BE2]" />,
      glowColor: "box-glow-purple"
    },
    {
      id: "mission",
      title: "Misión y Visión",
      desc: "Democratizar la IA y ser la agencia integradora de referencia para la pequeña empresa en España.",
      icon: <Target className="w-8 h-8 text-[#00F0FF]" />,
      glowColor: "box-glow-cyan"
    },
    {
      id: "csr",
      title: "RSC",
      desc: "Ética de datos, algoritmos transparentes, fomento del paperless y teletrabajo para reducir huella de carbono.",
      icon: <Leaf className="w-8 h-8 text-[#8A2BE2]" />,
      glowColor: "box-glow-purple"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto relative perspective-[2000px]" id="filosofia">
      <div className="text-center mb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 font-heading"
        >
          Filosofía y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">Valores</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Los pilares éticos y estratégicos sobre los que construimos la innovación.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {values.map((val) => (
          <motion.div key={val.id} variants={itemVariants}>
            <TiltCard className={`h-full group-hover:${val.glowColor}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{val.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{val.desc}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
