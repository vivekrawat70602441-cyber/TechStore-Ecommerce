const stats = [
    {
        value: "10K+",
        label: "Happy Customers",
    },
    {
        value: "500+",
        label: "Premium Products",
    },
    {
        value: "4.9★",
        label: "Customer Rating",
    },
];

export default function HeroStats() {
    return (
        <div
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3"
        >
            {stats.map((item) => (
                <div key={item.label}>
                    <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {item.value}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
}