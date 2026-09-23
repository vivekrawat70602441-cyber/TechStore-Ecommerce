"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import Container from "../common/Container";

export default function Newsletter() {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await fetch(`${API}/newsletter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Subscription failed");
            }
            setSuccess(data.message);
            setEmail("");
        } catch (error) {
            console.error("Newsletter subscription error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            onSubmit={handleSubmit}
            className="bg-gray-50 py-24 transition-colors duration-300 dark:bg-slate-950">
            <Container>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
                >

                    {/* Icon */}

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">

                        <Mail
                            size={30}
                            className="text-blue-600 dark:text-blue-400"
                        />

                    </div>

                    {/* Heading */}

                    <h2 className="mt-6 text-center text-4xl font-bold text-gray-900 transition-colors duration-300 dark:text-white font-['Arial',_ 'Helvetica',_ 'sans-serif']">
                        Subscribe to our Newsletter
                    </h2>

                    {/* Description */}

                    <p className="font-['Arial',_ 'Helvetica',_ 'sans-serif'] mx-auto mt-4 max-w-2xl text-center leading-7 text-gray-500 transition-colors duration-300 dark:text-gray-300">
                        Be the first to know about exclusive deals,
                        new arrivals, and special discounts delivered
                        directly to your inox.
                    </p>

                    {/* Form */}

                    <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-4 text-gray-900 outline-none transition-colors duration-300 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                        />

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
                        >
                            {loading ? "Subscribing..." : "Subscribe"}
                        </motion.button>

                    </form>

                    {success && (
                        <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-medium text-green-600 dark:text-green-400">
                            {success}
                        </p>
                    )}

                    {error && (
                        <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-medium text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}

                </motion.div>

            </Container>

        </section>
    );
}