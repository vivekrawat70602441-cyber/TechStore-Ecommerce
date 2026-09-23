"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeRightProps {
    children: ReactNode;
}

export default function FadeRight({
    children,
}: FadeRightProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.7,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}