import { CheckCircle2 } from "lucide-react";

const features = [
    "Free Shipping",
    "2-Year Warranty",
    "24/7 customer Support",
];

export default function HeroFeatures() {
    return (
        <div
            className="mt-10 flex flex-wrap gap-6">
            {features.map((feature) => (
                <div
                    key={feature}
                    className="flex items-center gap-2"
                >
                    <CheckCircle2
                        className="text-green-500 dark:text-green-400"
                        size={20}
                    />

                    <span className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300 font-['Arial',_ 'Helvetica',_ 'sans-serif']">
                        {feature}
                    </span>
                </div>
            ))}
        </div>
    );
}