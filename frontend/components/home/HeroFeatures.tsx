import { Truck, ShieldCheck, Headphones } from "lucide-react";

const features = [
    {
        text: "Free Shipping",
        icon: Truck,
    },
    {
        text: "2-Year Warranty",
        icon: ShieldCheck,
    },
    {
        text: "24/7 Customer Support",
        icon: Headphones,
    },
];

export default function HeroFeatures() {
    return (
        <div className="mt-10 flex flex-wrap gap-6">
            {features.map((feature) => {
                const Icon = feature.icon;

                return (
                    <div
                        key={feature.text}
                        className="flex items-center gap-2"
                    >
                        <Icon
                            className="text-green-500 dark:text-green-400"
                            size={20}
                        />

                        <span className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300 font-['Arial',_ 'Helvetica',_ 'sans-serif']">
                            {feature.text}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}