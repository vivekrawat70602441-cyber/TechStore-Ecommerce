"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeUpProps {
    children: ReactNode;
    delay?: number;
}

export default function FadeUp({
    children,
    delay = 0,
}: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}