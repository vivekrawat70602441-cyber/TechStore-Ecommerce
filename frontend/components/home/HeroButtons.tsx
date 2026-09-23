import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
    return (
        <div
            className="mt-8 flex flex-wrap items-center gap-4"
        >
            <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
                >
                    Shop Now
                    <ArrowRight size={18} />
            </Link>

            <Link
                    href="/products"
                    className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition-colors duration-300 hover:bg-gray-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                >
                    Explore Products
            </Link>
        </div>
    );
}