"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdminUser, UserOrder } from "@/types/user";
import { getAdminUser } from "@/services/admin/userService";
import UserDetails from "@/components/admin/users/UserDetails";
import UserOrders from "@/components/admin/users/UserOrders";
import UserEditForm from "@/components/admin/users/UserEditForm";

export default function AdminUserDetailsPage() {

    const params = useParams();
    const router = useRouter();

    const { token, isAdmin, loading: authLoading } = useAuth();

    const userId = params.id as string;
    const [user, setUser] = useState<AdminUser | null>(null);
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (authLoading || !token || !isAdmin) {
            return;
        }

        const loadUser = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getAdminUser(userId);

                setUser(data.user);
                setOrders(data.orders);
            } catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load user"
                );
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [authLoading, token, isAdmin, userId]);

    if (authLoading || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    Loading user...
                </p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Access Denied
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        You do not have permission to view this user.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <main className="p-0">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-6 dark:border-red-900 dark:bg-red-950/30">
                    <h2 className="font-semibold text-red-700 dark:text-red-400">
                        Failed to load user
                    </h2>

                    <p className="mt-2 wrap-break-word text-m text-red-600 dark:text-red-400">
                        {error}
                    </p>

                    <button
                        onClick={() => router.push("/admin/users")}
                        className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
                    >
                        Back to Users
                    </button>
                </div>
            </main>
        )
    }

    if (!user || !token) {
        return null;
    }

    return (
        <main className="space-y-6 p-0 sm:space-y-8">
            <div>
                <button
                    onClick={() => router.push("/admin/users")}
                    className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-110 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Users</span>
                </button>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                            User Details
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 sm:text-base dark:text-gray-400">
                            Manage user account
                        </p>
                    </div>

                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                            <Pencil size={18} />
                            Edit User
                        </button>
                    )}
                </div>
            </div>

            {editing ? (
                <UserEditForm
                    user={user}
                    onCancel={() => setEditing(false)}
                    onSuccess={(updatedUser) => {
                        setUser(updatedUser);
                        setEditing(false);
                    }}
                />
            ) : (
                <UserDetails user={user} />
            )}

            <UserOrders orders={orders} />
        </main>
    );
}