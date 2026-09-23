"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}

export default function AnimatedNumber({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 2500,
}: AnimatedNumberProps) {

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;

        const startValue = 0;
        const endValue = Number.isFinite(value) ? value : 0;

        const animate = (currentTime: number) => {
            if (startTime === null) {
                startTime = currentTime;
            }
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = startValue + (endValue - startValue) * progress;
            setDisplayValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        setDisplayValue(0);
        const animationFrame = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [value, duration]);

    return (
        <>
            {prefix}
            {displayValue.toLocaleString("en-IN", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </>
    );
}