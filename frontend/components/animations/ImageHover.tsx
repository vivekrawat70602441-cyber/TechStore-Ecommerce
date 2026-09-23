"use client";

import { motion } from "motion/react";

interface ImageHoverProps {
    children: React.ReactNode;
}

export default function ImageHover({
    children,
}: ImageHoverProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
            }}
            transition={{
                duration: 0.4,
            }}
        >
            {children}
        </motion.div>
    );
}