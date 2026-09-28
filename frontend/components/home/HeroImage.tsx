"use client";

import Image from 'next/image';
import { motion } from "motion/react";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex items-center justify-center w-full h-full min-h-125"
    >
      {/* Large Blur Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/30" />

      {/* Small Cyan Blur */}
      <div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl dark:bg-cyan-400/30" />

      {/* Product Image */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-3/4 w-full max-w-112.5 z-10 flex items-end justify-center"
      >
        <Image
          src="/hero/hero.png"
          alt="Professional presenting TechStore"
          fill
          priority
          sizes="(max-width: 1023px) 90vw, 550px"
          className="relative z-10 object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
        />

      </motion.div>
    </motion.div>
  );
}