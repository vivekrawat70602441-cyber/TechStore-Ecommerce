"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;
interface Contact {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function ContactPage() {
    const { token, loading: authLoading, isAdmin } = useAuth();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchContacts = useCallback(async () => {
        if (!token) {
            return;
        }
        try {
            setLoading(true);
            setError("");

            const response = await authFetch(`${API}/contact`,
                {
                    method: "GET",
                    headers: {
                    },
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch contact messages");
            }
            setContacts(data);
        } catch (error) {
            console.error("Failed to fetch contact messages:", error);
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Load Contact Messages
    useEffect(() => {
        if (!authLoading && token && isAdmin) {
            fetchContacts();
        }
    }, [authLoading, token, isAdmin, fetchContacts]);

    if (authLoading || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-gray-600 dark:text-gray-600">
                    Loading contact messages...
                </p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        You do not have permission to view contact messages.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <main className="p-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
                    <h2 className="font-semibold text-red-700 dark:text-red-400">
                        Failed to load contact messages
                    </h2>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                    <button
                        onClick={fetchContacts}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="p-6">
            <div className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Contact Messages
                        </h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            View messages submitted through the contact form.
                        </p>
                    </div>

                    <button
                        onClick={fetchContacts}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <div className="inline-flex rounded-lg bg-blue-50 p-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                    Total Messages: {contacts.length}
                </div>
            </div>

            {contacts.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        No Messages Found
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        There are currently no contact messages.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {contact.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {contact.email}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(
                                        contact.createdAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-slate-800/60">
                                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-300">
                                    {contact.message}
                                </p>
                            </div>

                            <div className="mt-4">
                                <code className="text-xs text-gray-400">
                                    ID: {contact._id.slice(-8)}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
