"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FiHeart,
    FiMenu,
    FiShoppingCart,
    FiUser,
    FiX,
    FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import Container from "../common/Container";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import ThemeToggle from "../theme/ThemeToggle";
import { useRouter } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {

    const router = useRouter();

    const { cart } = useCart();
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const { wishlist } = useWishlist();
    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        router.replace("/login");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white shadow-md dark:bg-slate-900 dark:shadow-black/30"
                : "bg-white/80 backdrop-blur-md dark:bg-slate-900/80"
                }`}
            >

                <Container>
                    <div className="flex h-20 items-center justify-between">

                        <Link
                            href="/"
                            className="shrink-0 font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-2xl font-extrabold tracking-tight sm:text-3xl"
                        >
                            <span className="text-slate-900 dark:text-white">Tech</span>
                            <span className="text-blue-600 dark:text-blue-400">Store</span>
                        </Link>

                        {/* Desktop */}

                        <nav className="hidden items-center gap-8 lg:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group relative font-['Arial' ,_'Helvetica' ,_'sans-serif'] font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-3/4" />
                                </Link>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="hidden items-center gap-5 lg:flex">

                            <ThemeToggle />

                            <Link
                                href="/wishlist"
                                className="group relative inline-block text-gray-800 dark:text-gray-200 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400"
                            >

                                <FiHeart size={22} />

                                {wishlist.length > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {wishlist.length}
                                    </span>
                                )}

                                <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />

                            </Link>

                            <Link
                                href="/cart"
                                className="group relative inline-block text-gray-800 dark:text-gray-200 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400"
                            >

                                <FiShoppingCart size={22} />

                                {totalItems > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {totalItems}
                                    </span>

                                )}

                                <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />

                            </Link>

                            {user ? (
                                <div className="flex items-center gap-4">

                                    <Link
                                        href="/orders"
                                        className="group relative font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                    >
                                        My Orders
                                        <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-3/4" />
                                    </Link>

                                    {user.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-sm font-bold
                                            text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 hover:shadow-md dark:border-blue-900 dark:bg-blue-950/50
                                            dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/50"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}

                                    <span className="whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                                        👤 {user.name}
                                    </span>

                                    <button
                                        onClick={handleLogout}
                                        className="cursor-pointer rounded-lg bg-red-500 px-3 py-2 font-[Arial',_ 'Helvetica',_ 'sans-serif'] text-sm text-white transition hover:bg-red-600"
                                    >
                                        Logout
                                    </button>

                                </div>
                            ) : (
                                <div className="flex items-center gap-4">

                                    <Link
                                        href="/login"
                                        className="group relative font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                    >
                                        Login
                                        <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-3/4" />
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-[Arial',_ 'Helvetica',_ 'sans-serif'] text-white transition hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </div>

                            )}
                        </div>

                        {/* Moblie Button */}

                        <button
                            type="button"
                            aria-label={
                                menuOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="shrink-0 rounded-lg p-2 text-gray-800 transition hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800 lg:hidden"
                        >
                            {menuOpen ? (
                                <FiX size={28} />
                            ) : (
                                <FiMenu size={28} />
                            )}
                        </button>

                    </div>
                </Container>
            </header>

            {/* MOBILE OVERLAY */}

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu */}

            <AnimatePresence>
                {menuOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: .3, ease: "easeInOut" }}
                        className="fixed right-0 top-20 z-40 h-[calc(100dvh-5rem)] w-[min(85vw,20rem)] overflow-y-auto border-l border-gray-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 lg:hidden"
                    >
                        <nav className="flex flex-col">

                            {/* MAIN LINKS */}
                            <div className="flex flex-col">
                                {navLinks.map((link) => (

                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="group relative flex items-center justify-between py-3 font-['Arial' ,_'Helvetica' ,_'sans-serif'] font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                    >

                                        <span>{link.name}</span>
                                        <FiChevronRight
                                            size={19}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />

                                        <span className="absolute bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-1/2" />

                                    </Link>

                                ))}
                            </div>

                            {/* Divider */}

                            <div className="my-4 border-t border-gray-200 dark:border-slate-700" />

                            <div className="mb-5 flex items-center justify-between">

                                <span className="font-medium text-gray-800 dark:text-white">
                                    Theme
                                </span>

                                <ThemeToggle />

                            </div>

                            {/* Wishlist */}

                            <Link
                                href="/wishlist"
                                onClick={closeMenu}
                                className="group relative flex items-center justify-between py-3 text-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                            >

                                <div className="flex items-center gap-3">

                                    <FiHeart size={22} />

                                    <span>Wishlist</span>

                                </div>

                                <div className="flex items-center gap-2">

                                    {wishlist.length > 0 && (

                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs text-white">
                                            {wishlist.length}
                                        </span>
                                    )}
                                    <FiChevronRight
                                        size={19}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </div>

                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-1/2" />
                            </Link>

                            <Link
                                href="/cart"
                                onClick={closeMenu}
                                className="group relative flex items-center justify-between py-3 text-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                            >

                                <div className="flex items-center gap-3">
                                    <FiShoppingCart size={22} />
                                    <span>Cart</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {totalItems > 0 && (

                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 py-1.5 text-xs text-white">
                                            {totalItems}
                                        </span>

                                    )}
                                    <FiChevronRight
                                        size={19}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </div>

                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-1/2" />

                            </Link>

                            {user ? (

                                <div className="mt-4 space-y-4">

                                    <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">

                                        <FiUser size={22} />

                                        <span className="truncate font-medium">
                                            {user.name}
                                        </span>

                                    </div>

                                    <Link
                                        href="/orders"
                                        onClick={closeMenu}
                                        className="group relative inline-block py-2 font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                    >
                                        My Orders
                                        <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
                                    </Link>

                                    {user.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            onClick={closeMenu}
                                            className="block rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center font-['Arial' ,_'Helvetica' ,_'sans-serif'] text-sm font-bold
                                            text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-md dark:border-blue-900 dark:bg-blue-950/50
                                            dark:text-blue-400 dark:hover:bg-blue-900/50"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full cursor-pointer rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-4 space-y-3">

                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="block rounded-lg border border-gray-300 py-3 text-center text-gray-800 transition hover:bg-gray-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className="block rounded-lg bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                        </nav>

                    </motion.aside>

                )}
            </AnimatePresence>
        </>
    );
}
