"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScaleInProps {
    children: ReactNode;
}

export default function ScaleIn({
    children,
}: ScaleInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    )
}