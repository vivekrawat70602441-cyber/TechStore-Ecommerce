"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/authFetch";

type Subscriber = {
    _id: string;
    email: string;
    createdAt: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

export default function NewsletterPage() {
    const { token, isAdmin } = useAuth();
    const router = useRouter();

    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchSubscribers = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            setError("");

            const response = await authFetch(`${API}/newsletter`, {
                method: "GET",
                headers: {
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch subscribers");
            }
            setSubscribers(data);
        } catch (error) {
            console.error("Fetch newsletter subscribers error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token && isAdmin) {
            fetchSubscribers();
        }
    }, [token, isAdmin, fetchSubscribers]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
                <p className="text-gray-600 dark:text-gray-300">
                    Loading subscribers...
                </p>
            </div>
        );
    }

    if (!token || !isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        You do not have permission to access this page.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 transition-colrs duration-300 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Newsletter Subscribers
                        </h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Managers users subscribed to your newsletter.
                        </p>
                    </div>

                    <button
                        onClick={fetchSubscribers}
                        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-500 p-4 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Subscribers
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {subscribers.length}
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-150">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        #
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Subscribed On
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {subscribers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No newsletter subscribers yet.
                                        </td>
                                    </tr>
                                ) : (
                                    subscribers.map(
                                        (subscriber, index) => (
                                            <tr
                                                key={subscriber._id}
                                                className="border-b border-gray-100 last:border-b-0 dark:border-slate-800"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {subscriber.email}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(
                                                        subscriber.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
