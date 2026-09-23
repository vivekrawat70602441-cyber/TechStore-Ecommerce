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

    const {
        token,
        loading: authLoading,
        isAdmin,
    } = useAuth();

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

                    headers: {
                    },
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch users"
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
    }, [
        authLoading,
        token,
        isAdmin,
        fetchUsers,
    ]);

    // loading

    if (authLoading || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-gray-600 dark:text-gray-600">
                    Loading users...
                </p>
            </div>
        );
    }

    // Admin

    if (!isAdmin) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        You do not have permission to view users.
                    </p>
                </div>
            </div>
        );
    }

    // Error

    if (error) {
        return (
            <main className="p-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
                    <h2 className="font-semibold text-red-700 dark:text-red-400">
                        Failed to load users
                    </h2>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                    <button
                        onClick={fetchUsers}
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
                            User Management
                        </h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            View and manage registered users.
                        </p>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* User Count */}
            <div className="mb-6">
                <div className="inline-flex rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                    Total Users: {users.length}
                </div>
            </div>

            {/* Users Table */}
            {users.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        No Users Found
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        There are currently no registered users.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full `min-w-[800px]`">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Actions
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Joined
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
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

                                        <td className="px-6 py-5">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={
                                                    user.role === "admin"
                                                        ? "rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                                                        : "rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                                                }
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400">

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

                                        <td className="px-6 py-5">
                                            <code className="text-xs text-gray-500 dark:text-gray-400">
                                                {user._id.slice(-8)}
                                            </code>
                                        </td>

                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/users/${user._id}`
                                                    )
                                                }
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
