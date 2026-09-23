import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({
    items,
}: BreadcrumbProps) {
    return (
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

            {items.map((item, index) => {

                const isLast = index === items.length - 1;

                return (
                    <div
                        key={item.label}
                        className="flex items-center gap-2"
                    >

                        {isLast ? (
                            <span className="font-medium">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href || "#"}
                                className="transition hover:text-blue-600"
                            >
                                {item.label}
                            </Link>
                        )}

                        {!isLast && (
                            <FiChevronRight
                                className="text-gray-400"
                            />
                        )}

                    </div>

                );

            })}

        </nav>

    );
}