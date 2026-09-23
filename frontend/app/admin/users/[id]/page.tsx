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
    }, [
        authLoading,
        token,
        isAdmin,
        userId,
    ]);

    if (authLoading || loading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="p-6">
                Access Denied
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
            </div>
        );
    }

    if (!user || !token) {
        return null;
    }

    return (
        <main className="space-y-8 p-6">
            <div>

                <button
                    onClick={() =>
                        router.push("/admin/users")
                    }
                    className="mb-4 inline-flex items-center gap-2"
                >
                    <ArrowLeft size={18} />
                    Back to Users
                </button>

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            User Details
                        </h1>
                        <p className="text-gray-500">
                            Manage user account
                        </p>
                    </div>

                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            <Pencil size={18} />
                            Edit User
                        </button>
                    )}
                </div>
            </div>

            {!editing ? (
                <UserEditForm
                    user={user}
                    onCancel={() => setEditing(false)}
                    onSuccess={(updatedUser) => {
                        setUser(updatedUser);
                        setEditing(false);
                    }}
                />
            ) : (
                <UserDetails
                    user={user}
                />
            )}

            <UserOrders
                orders={orders}
            />
        </main>
    );
}