"use client";

import { motion } from "motion/react";

interface ButtonAnimationProps {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function ButtonAnimation({
    children,
    disabled = false,
}: ButtonAnimationProps) {
    return (
        <motion.div
            whileHover={disabled
                ? undefined
                : { scale: 1.02 }
            }
            whileTap={
                disabled
                    ? undefined
                    : { scale: 0.97 }
            }
            transition={{
                duration: 0.2,
            }}
        >
            {children}
        </motion.div>
    );
}