"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import  Link  from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {

    const router = useRouter();

    const {
        isAuthenticated,
        isAdmin,
        loading,
        login,
    } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        if (!loading && isAuthenticated) {

            if (isAdmin) {
                router.replace("/admin");
            } else {
                router.replace("/");
            }
        }
    }, [
        loading,
        isAuthenticated,
        isAdmin,
        router,
    ]);

    const handleLogin = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSubmitting(true);

        try {

            const response = await fetch(`${API}/users/login`,
                {

                    method: "POST",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
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

            alert("Login Successful");

            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong");

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
                    Welcome Back
                </h1>

                <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                    Login to your TechStore account
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </button>

                     <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                        Don't have an account?

                    <Link
                        href="/register"
                        className="ml-2 font-semibold text-blue-600 hover:underlined"
                    >

                        Register

                    </Link>

                </p>

                </form>
            </div>
        </main>
    );
} 