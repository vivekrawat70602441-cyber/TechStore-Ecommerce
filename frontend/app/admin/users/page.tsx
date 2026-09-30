"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
}

export default function AdminUserspage() {
    const router = useRouter();

    const { token, loading: authLoading, isAdmin } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Users
    const fetchUsers = useCallback(async () => {
        if (!token) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await authFetch(
                `${API}/users/admin`,
                {
                    method: "GET",
                    headers: {},
                });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch users"
                );
            }
            setUsers(data.users || []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Load Users

    useEffect(() => {
        if (!authLoading && token && isAdmin) {
            fetchUsers();
        }
    }, [authLoading, token, isAdmin, fetchUsers]);

    // loading

    if (authLoading || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center whitespace-nowrap px-4">
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    Loading users...
                </p>
            </div>
        );
    }

    // Admin

    if (!isAdmin) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center whitespace-nowrap px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        You do not have permission to view users.
                    </p>
                </div>
            </div>
        );
    }

    // Error

    if (error) {
        return (
            <main className="p-0">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-6 dark:border-red-900 dark:bg-red-950/30">
                    <h2 className="font-semibold text-red-700 dark:text-red-400">
                        Failed to load users
                    </h2>
                    <p className="mt-2 wrap-break-word text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                    <button
                        onClick={fetchUsers}
                        className="mt-4 w-full rounded-lg bg-red-600 whitespace-nowrap px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="p-0">
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                            User Management
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 sm:text-base dark:text-gray-400">
                            View and manage registered users.
                        </p>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="w-full rounded-lg border border-gray-300 bg-white whitespace-nowrap px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* User Count */}
            <div className="mb-6">
                <div className="inline-flex rounded-lg bg-blue-50 whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                    Total Users: {users.length}
                </div>
            </div>

            {/* Users Table */}
            {users.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        No Users Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base dark:text-gray-400">
                        There are currently no registered users.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-200">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                                <tr>
                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        Actions
                                    </th>

                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        Name
                                    </th>

                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        Email
                                    </th>

                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        Role
                                    </th>

                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        Joined
                                    </th>

                                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6 dark:text-gray-300">
                                        User ID
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="transition hover:bg-gray-50 dark:hover:bg-slate-800/40"
                                    >

                                        <td className="max-w-45  px-4 py-5 sm:px-6">
                                            <p className="wrap-break-word font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </p>
                                        </td>

                                        <td className="max-w-60 px-4 py-5 sm:px-6">
                                            <p className="wrap-break-word text-sm text-gray-600 dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </td>

                                        <td className="px-4 py-5 sm:px-6">
                                            <span
                                                className={
                                                    user.role === "admin"
                                                        ? "inline-flex rounded-full bg-purple-100 whitespace-nowrap px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                                                        : "inline-flex rounded-full bg-gray-100 whitespace-nowrap px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                                                }
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-500 sm:px-6 dark:text-gray-400">

                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </td>

                                        <td className="px-6 py-5 sm:px-6">
                                            <code className="break-all text-xs text-gray-500 dark:text-gray-400">
                                                {user._id.slice(-8)}
                                            </code>
                                        </td>

                                        <td className="px- py-5 sm:px-6">
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/users/${user._id}`
                                                    )
                                                }
                                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    );
}
