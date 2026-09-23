"use client";

import Image from 'next/image';
import { motion } from "motion/react";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
      }}
      className="relative flex items-center justify-center"
    >
      {/* Large Blur Blur */}
      <div className="absolute h-72 w-72 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/30" />

      {/* Small Cyan Blur */}
      <div className="absolute right-8 top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl dark:bg-cyan-400/30" />

      {/* Product Image */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative aspect-square w-full max-w-155 translate-x-4"
      >
        <Image
          src="/hero/hero-image.webp"
          alt="Premium Laptop"
          fill
          priority
          sizes="(max-width: 1023px) 90vw, 550px"
          className="relative z-10 scale-110 rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
        />

      </motion.div>
    </motion.div>
  );
}