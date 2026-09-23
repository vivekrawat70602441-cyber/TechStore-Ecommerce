"use client";

import { useEffect, useState } from "react";

interface StatisticsCardProps {
    title: string;
    value: string | number;
    description?: string;
    prefix?: string;
}

export default function StatisticsCard({
    title,
    value,
    description,
    prefix = "",
}: StatisticsCardProps) {
    const targetValue =
        typeof value === "number"
            ? value
            : Number(value.replace(/[^0.9.-]+/g, ""));

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!Number.isFinite(targetValue)) {
            setDisplayValue(0);
            return;
        }
        const duration = 2000;
        const startTime = performance.now();
        let animationFrameId: number;
        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = targetValue * easedProgress;
            setDisplayValue(currentValue);
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [targetValue]);

    const formattedValue =
        new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
        }).format(displayValue);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {prefix}
                {formattedValue}
            </h2>

            {description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            )}
        </div>
    );
}