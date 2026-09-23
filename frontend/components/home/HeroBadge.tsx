import { Sparkles } from "lucide-react";

export default function HeroBadge() {
    return (
        <div
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 transition-colors duration-300 dark:border-blue-800 dark:bg-blue-950/40"
        >
            <Sparkles
                className="text-blue-600 dark:text-blue-400"
                size={18}
            />

            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-['Arial',_ 'Helvetica',_ 'sans-serif']">
                New Collection 2026
            </span>
        </div>
    );
}