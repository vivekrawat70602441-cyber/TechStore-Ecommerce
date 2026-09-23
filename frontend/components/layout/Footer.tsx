"use client";

import Link from "next/link";
import Container from "../common/Container";
import {
    FiFacebook,
    FiGithub,
    FiMail,
    FiMapPin,
    FiPhone,
    FiTwitter,
} from "react-icons/fi";
import FadeUp from "../animations/FadeUp";
import { motion } from "motion/react";

export default function Footer() {
    return (
        <footer className="border-t bg-gray-900 text-gray-300">
            <FadeUp>

                <Container>

                    <div className="grid gap-10 py-20 md:grid-cols-2 lg:grid-cols-4">

                        {/* Logo */}

                        <div>

                            <Link
                                href="/"
                                className="text-3xl font-bold text-white"
                            >
                                TechStore
                            </Link>

                            <p className="mt-4 leading-7">
                                Discover premium electronics with unbeatable prices,
                                fast delivery, and trusted quality.
                            </p>

                            <div className="mt-6 flex gap-4">

                                <motion.a
                                    href="#"
                                    aria-label="Facebook"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-full border border-gray-700 p-2 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                                >
                                    <FiFacebook size={20} />
                                </motion.a>

                                <motion.a
                                    href="#"
                                    aria-label="Twitter"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-full border border-gray-700 p-2 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                                >
                                    <FiTwitter size={20} />
                                </motion.a>

                                <motion.a
                                    href="https://github.com/vivekrawat70602441-cyber"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-full border border-gray-700 p-2 transition hover:border-white hover:bg-white  hover:text-black"
                                >
                                    <FiGithub size={20} />
                                </motion.a>

                            </div>

                        </div>

                        {/* Shop */}

                        <div>

                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Shop
                            </h3>

                            <div className="space-y-3">

                                <Link
                                    href="/products"
                                    className="block transition hover:text-white"
                                >
                                    Products
                                </Link>

                                <Link
                                    href="/categories"
                                    className="block transition hover:text-white"
                                >
                                    Categories
                                </Link>

                                <Link
                                    href="/deals"
                                    className="block transition hover:text-white"
                                >
                                    Deals
                                </Link>

                            </div>

                        </div>

                        {/* Account */}

                        <div>

                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Account
                            </h3>

                            <div className="space-y-3">

                                <Link
                                    href="/profile"
                                    className="block transition hover:text-white"
                                >
                                    My Account
                                </Link>

                                <Link
                                    href="/wishlist"
                                    className="block transition hover:text-white"
                                >
                                    Wishlist
                                </Link>

                                <Link
                                    href="/cart"
                                    className="block transition hover:text-white"
                                >
                                    Cart
                                </Link>

                            </div>

                        </div>

                        {/* Support */}

                        <div>

                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Support
                            </h3>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">

                                    <FiMail className="text-blue-400" />

                                    <span>
                                        support@techstore.com
                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <FiPhone className="text-blue-400" />

                                    <span>
                                        +91 98373 57758
                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <FiMapPin className="text-blue-400" />

                                    <span>
                                        Uttarakhand, India
                                    </span>

                                </div>

                                <Link
                                    href="/contact"
                                    className="mt-2 inline-block font-medium text-blue-400 transition hover:text-white"
                                >
                                    Contact Us
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Bottom */}

                    <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
                        <p>
                            © 2026 TechStore. All rights reserved.
                        </p>

                        <p className="mt-2">
                            Built with Next.js & Tailwind CSS.
                        </p>

                    </div>

                </Container>

            </FadeUp>

        </footer>
    );
}