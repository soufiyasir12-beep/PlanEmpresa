"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- Custom Components ---

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#_";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const delay = setTimeout(startAnimation, 800);
    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [text]);

  return <span className={className}>{displayText || text.replace(/./g, "_")}</span>;
};

const MagneticButton = ({ children, onClick, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hX = e.clientX - (rect.left + rect.width / 2);
    const hY = e.clientY - (rect.top + rect.height / 2);
    x.set(hX * 0.3);
    y.set(hY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {children}
    </motion.button>
  );
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToChat = () => {
    const chatElement = document.getElementById("chatbot");
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeFrame: number;
    const fadeDuration = 0.5;

    const updateOpacity = () => {
      if (!video) return;
      const { currentTime, duration } = video;
      
      if (isNaN(duration) || duration === 0) {
        fadeFrame = requestAnimationFrame(updateOpacity);
        return;
      }

      let newOpacity = 1;
      if (currentTime < fadeDuration) {
        newOpacity = currentTime / fadeDuration;
      } else if (duration - currentTime < fadeDuration) {
        newOpacity = Math.max(0, (duration - currentTime) / fadeDuration);
      }
      
      video.style.opacity = newOpacity.toString();
      fadeFrame = requestAnimationFrame(updateOpacity);
    };

    const handlePlay = () => {
      fadeFrame = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    video.play().catch(() => {});

    return () => {
      if (video) {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('ended', handleEnded);
      }
      cancelAnimationFrame(fadeFrame);
    };
  }, []);

  return (
    <section className="relative z-0 min-h-screen flex flex-col overflow-visible pt-12 pb-10">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover transition-opacity duration-75"
          style={{ opacity: 0 }}
        />
      </div>

      {/* SVG Circuit Lines (Left and Right) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen hidden md:block">
        <svg className="absolute left-0 top-0 w-32 h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <path d="M 50,0 L 50,200 L 20,230 L 20,400 L 80,460 L 80,800 L 50,830 L 50,1000" fill="none" stroke="var(--color-neon-cyan)" strokeWidth="0.5" className="animate-[circuit-flow_20s_linear_infinite]" strokeDasharray="20 40" />
          <path d="M 80,0 L 80,150 L 50,180 L 50,500 L 20,530 L 20,900" fill="none" stroke="var(--color-neon-purple)" strokeWidth="0.5" className="animate-[circuit-flow_15s_linear_infinite_reverse]" strokeDasharray="15 30" />
        </svg>
        <svg className="absolute right-0 top-0 w-32 h-full scale-x-[-1]" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <path d="M 50,0 L 50,300 L 80,330 L 80,600 L 20,660 L 20,800 L 50,830 L 50,1000" fill="none" stroke="var(--color-neon-purple)" strokeWidth="0.5" className="animate-[circuit-flow_25s_linear_infinite]" strokeDasharray="25 50" />
          <path d="M 20,0 L 20,250 L 50,280 L 50,700 L 80,730 L 80,1000" fill="none" stroke="var(--color-neon-cyan)" strokeWidth="0.5" className="animate-[circuit-flow_18s_linear_infinite_reverse]" strokeDasharray="10 20" />
        </svg>
      </div>

      {/* Blurred overlay shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950 blur-[82px] pointer-events-none z-0 rounded-[100%]" />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 mt-8">
        
        {/* Morphing Aura behind main text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#6366f1]/30 via-[#a855f7]/30 to-[#fcd34d]/30 blur-2xl animate-[aura-morph_15s_ease-in-out_infinite] -z-10" />

        <motion.h1
          className="font-heading font-normal leading-[1.02] tracking-[-0.024em] text-center max-w-6xl flex flex-col md:flex-row items-center justify-center flex-wrap gap-x-6 gap-y-2 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[100px] md:text-[160px] lg:text-[200px] bg-clip-text text-transparent bg-gradient-to-l from-[#fcd34d] via-[#a855f7] to-[#6366f1] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            AI
          </span>
          <span className="text-[60px] md:text-[100px] lg:text-[140px] text-[var(--foreground)]">
            Solutions
          </span>
        </motion.h1>
        
        <motion.div
          className="text-[40px] md:text-[60px] lg:text-[80px] font-heading font-normal text-[var(--foreground)] leading-[1.02] tracking-[-0.024em] -mt-4 mb-6 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          & Automation
        </motion.div>

        <motion.h2
          className="text-lg text-[var(--color-hero-sub)] leading-8 opacity-80 mb-2 font-heading font-mono tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ScrambleText text="Democratizando la IA para PYMEs" />
        </motion.h2>

        <motion.p
          className="text-lg text-[var(--color-hero-sub)] leading-8 max-w-2xl mt-[9px] opacity-80 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transformamos negocios tradicionales mediante Inteligencia Artificial,
          Automatización Robótica (RPA) y Chatbots, impulsando el crecimiento y
          reduciendo costes operativos.
        </motion.p>

        <MagneticButton
          onClick={scrollToChat}
          className="group mt-[35px] px-[32px] py-[24px] rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold flex items-center gap-3 transition-colors hover:bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A2BE2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Interactuar con el Producto</span>
          <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
        </MagneticButton>
      </div>

      {/* Logo Marquee */}
      <div className="w-full max-w-5xl mx-auto pb-10 mt-24 overflow-hidden relative z-10 flex flex-col md:flex-row items-center gap-12 px-8">
        <div className="text-[var(--foreground)]/50 text-sm whitespace-nowrap text-center md:text-left">
          Con la confianza de empresas<br/>innovadoras en España
        </div>
        
        <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-16 w-max animate-[marquee_20s_linear_infinite]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16">
                {["OpenAI", "Anthropic", "Google Cloud", "Microsoft Azure", "Vercel"].map((brand, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <span className="text-[var(--foreground)] font-bold text-lg">{brand.charAt(0)}</span>
                    </div>
                    <span className="text-base font-semibold text-[var(--foreground)] opacity-90 transition-opacity group-hover:opacity-100">{brand}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
