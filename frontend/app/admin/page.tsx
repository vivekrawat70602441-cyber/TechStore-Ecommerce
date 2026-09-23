"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

interface AdminUser {
    userId: string;
    role: string;
}

interface AdminResponse {
    message: string;
    user: AdminUser;
}

export default function AdminPage() {
    const router = useRouter();

    const [adminData, setAdminData] = useState<AdminResponse | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAdminData = async () => {

            try {

                const response = await authFetch(
                    `${API}/admin`,
                    {
                        headers: {
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {

                    if (response.status === 403) {
                        setError(
                            "You are not authorized to access the admin panel."
                        );
                    } else {
                        setError(
                            data.message ||
                            "Something went wrong."
                        );
                    }

                    return;
                }

                setAdminData(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to connect to the server."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();

    }, [router]);

    return (

        <ProtectedRoute>

            <main className="min-h-screen bg-gray-50 pt-28 pb-20 dark:bg-slate-950">
                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Admin",
                            },
                        ]}
                    />

                    {loading && (
                        <div className="mt-10 text-center">

                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Loading Admin Dashboard...
                            </p>

                        </div>
                    )}

                    {!loading && error && (
                        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">

                            <h1 className="text-2xl font-bold text-red-600">
                                Access Denied
                            </h1>

                            <p className="mt-3 text-red-500">
                                {error}
                            </p>

                        </div>
                    )}

                    {!loading &&
                        !error &&
                        adminData && (

                            <div className="mt-10">
                                <div className="mb-8">

                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                        Admin Dashboard
                                    </h1>

                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Manage your TechStore application.
                                    </p>

                                </div>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Admin Status
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-green-600">
                                            Active
                                        </h2>

                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Role
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                            {adminData.user.role}
                                        </h2>

                                    </div>

                                    <Link
                                        href="/admin/products"
                                        className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-ld dark:border-slate-700 dark:bg-slate-900"
                                    >

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Products
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                            Manage
                                        </h2>

                                        <p className="mt-2 text-sm text-blue-600">
                                            Manage Products →
                                        </p>

                                    </Link>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Orders
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                            Manage
                                        </h2>

                                    </div>

                                </div>

                                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Welcome, Admin
                                    </h2>

                                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                                        The TechStore Admin Dashboard is a centralized management system designed to efficiently manage and monitor the entire e-commerce platform. 
                                        It provides administrators with an overview of important store activities, including products, orders, users, sales, and overall store performance. 
                                        Administrators can add, update, and manage products, monitor customer orders, track order statuses, and manage essential store data through a clean and responsive interface. 
                                        The dashboard is securely integrated with the backend and MongoDB Atlas, ensuring that all changes are reflected in the live database. 
                                        With authentication and role-based access control, the Admin Dashboard provides a secure and organized environment for managing the TechStore e-commerce platform.
                                    </p>

                                    <p className="mt-2 text-sm text-gray-400">
                                        USER ID: {adminData.user.userId}
                                    </p>

                                </div>

                            </div>

                        )}

                </Container>

            </main>

        </ProtectedRoute>
    );
}