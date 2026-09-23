"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut, Home, MessageSquare, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "../theme/ThemeToggle";

export default function AdminSidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const { logout } = useAuth();

    const navigation: {
        name: string;
        href: string;
        icon: LucideIcon;
    }[] = [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Products", href: "/admin/products", icon: Package },
            { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { name: "Users", href: "/admin/users", icon: Users },
            { name: "Contact Messages", href: "/admin/contact", icon: MessageSquare},
            { name: "Newsletter Subscribers", href: "/admin/newsletter", icon: Mail },
            { name: "Statistics", href: "/admin/statistics", icon: BarChart3 },
        ];

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            {/* Admin Header */}

            <div className="border-b border-gray-200 p-6 dark:border-slate-800">

                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Admin Panel
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    TechStore
                </p>

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-2 p-4">
                {navigation.map((item) => {

                    const Icon = item.icon;

                    const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                                }`}
                        >

                            <Icon size={20} />

                            <span>{item.name}</span>

                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}

            <div className="border-t border-gray-200 p-4 dark:border-slate-800">

                <Link
                    href="/"
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    <Home size={20} />
                    <span>View Store</span>
                </Link>

                <div className="flex items-center px-4 py-3">
                    <ThemeToggle />
                </div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                    <LogOut size={20} />
                    <span>Logout</span>

                </button>

            </div>

        </aside>
    );
}