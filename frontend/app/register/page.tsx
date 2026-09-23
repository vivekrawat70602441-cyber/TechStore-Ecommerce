"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {

    const router = useRouter();

    const {
        isAuthenticated,
        loading,
        login,
    } = useAuth();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        if (!loading && isAuthenticated) {
            router.replace("/");
        }
    }, [
        loading,
        isAuthenticated,
        router,
    ]);

    const handleRegister = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setSubmitting(true);

        try {

            const response = await fetch(
                `${API}/users/register`,
                {

                    method: "POST",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                setSubmitting(false);
                return;
            }

            login(data.user);

            alert("Registration Successful");

            router.push("/");

        } catch (error) {

            console.error(error);
            alert("Something went wrong. Please try again.");
        }
        setSubmitting(false);
    };

    if (loading) {
        return null;
    }

    return (

        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16 dark:bg-slate-950">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900 dark:shadow-black/40">

                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                    Join TechStore and start shopping today
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >

                        {submitting
                            ? "Creating Account..."
                            : "Register"}

                    </button>

                </form>

                <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                    Already have an account?

                    <Link
                        href="/login"
                        className="ml-2 font-semibold text-blue-600 hover:underlined"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </main>
    );
}
