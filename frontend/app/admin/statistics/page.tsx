"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAdminStatistics } from "@/services/admin/statisticsService";
import type { AdminStatistics } from "@/types/statistics";

import StatisticsCard from "@/components/admin/statistics/StatisticsCard";
import OrderStatusCard from "@/components/admin/statistics/OrderStatusCard";
import RevenueChart from "@/components/admin/statistics/RevenueChart";
import StatisticsLoading from "@/components/admin/statistics/StatisticsLoading";

export default function AdminStatisticsPage() {

    const { token } = useAuth();
    const [statistics, setStatistics] = useState<AdminStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchStatistics = async () => {

            if (!token) {
                setLoading(false);
                setError("Authentication token not found");
                return;
            }

            try {

                setLoading(true);
                setError(null);

                const data = await getAdminStatistics();
                setStatistics(data);

            } catch (error) {

                console.error("Failed to fetch statistics:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch statistics"
                );

            } finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, [token]);

    if (loading) {
        return (
            <main className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Statistics
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Loading dashboard statistics...
                    </p>
                </div>
                <StatisticsLoading />
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-6">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
                    <h1 className="text-xl font-semibold text-red-700 dark:text-red-400">
                        Failed to load statistics
                    </h1>

                    <p className="mt-2 text-red-600 dark:text-red-300">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    if (!statistics) {
        return (
            <main className="p-6">
                <p className="text-gray-600 dark:text-gray-300">
                    No statistics available.
                </p>
            </main>
        );
    }

    return (
        <main className="p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Statistics
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Overview of your ecommerce store
                </p>
            </div>


            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <StatisticsCard
                    title="Total Users"
                    value={statistics.overview.totalUsers}
                    description="Registered users"
                />

                <StatisticsCard
                    title="Total Products"
                    value={statistics.overview.totalProducts}
                    description="Products in store"
                />

                <StatisticsCard
                    title="Total Orders"
                    value={statistics.overview.totalOrders}
                    description="Orders placed"
                />

                <StatisticsCard
                    title="Total Revenue"
                    value={statistics.overview.totalRevenue}
                    prefix="₹"
                    description="Revenue from orders"
                />

            </div>

            {/* Statistics Details */}

            <div className="mt-8 grid grid-cols- gap-6 lg:grid-cols-2">

                <OrderStatusCard ordersByStatus={statistics.ordersByStatus} />

                <RevenueChart revenueByMonth={statistics.revenueByMonth} />

            </div>
        </main>
    );
}