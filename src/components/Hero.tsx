"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    const fadeDuration = 0.5; // 0.5s fade in/out

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

    // Initial play
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

      {/* Blurred overlay shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950 blur-[82px] pointer-events-none z-0 rounded-[100%]" />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 mt-8">
        <motion.h1
          className="font-heading font-normal leading-[1.02] tracking-[-0.024em] text-center max-w-6xl flex flex-col md:flex-row items-center justify-center flex-wrap gap-x-6 gap-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[100px] md:text-[160px] lg:text-[200px] bg-clip-text text-transparent bg-gradient-to-l from-[#fcd34d] via-[#a855f7] to-[#6366f1]">
            AI
          </span>
          <span className="text-[60px] md:text-[100px] lg:text-[140px] text-[var(--foreground)]">
            Solutions
          </span>
        </motion.h1>
        
        <motion.div
          className="text-[40px] md:text-[60px] lg:text-[80px] font-heading font-normal text-[var(--foreground)] leading-[1.02] tracking-[-0.024em] -mt-4 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          & Automation
        </motion.div>

        <motion.h2
          className="text-lg text-[var(--color-hero-sub)] leading-8 opacity-80 mb-2 font-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Democratizando la IA para PYMEs
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

        <motion.button
          onClick={scrollToChat}
          className="mt-[25px] px-[29px] py-[24px] rounded-full bg-[var(--foreground)] text-[var(--background)] font-semibold flex items-center gap-3 transition-transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Interactuar con el Producto
          <ArrowDown className="w-5 h-5" />
        </motion.button>
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
                  <div key={idx} className="flex items-center gap-3">
                    <div className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center">
                      <span className="text-[var(--foreground)] font-bold text-lg">{brand.charAt(0)}</span>
                    </div>
                    <span className="text-base font-semibold text-[var(--foreground)] opacity-90">{brand}</span>
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
