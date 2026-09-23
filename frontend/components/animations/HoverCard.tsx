"use client";

import { motion } from "motion/react";

interface HoverCardProps {
    children: React.ReactNode;
}

export default function HoverCard({
    children,
}: HoverCardProps) {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.25,
            }}
        >
            {children}
        </motion.div>
    );
}