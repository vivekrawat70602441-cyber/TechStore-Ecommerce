"use client";

import type { RevenueByMonth } from "@/types/statistics";
import AnimatedNumber from "@/components/admin/statistics/AnimatedNumber";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Legend,
    Rectangle,
    type BarShapeProps,
} from "recharts";

interface RevenueChartProps {
    revenueByMonth: RevenueByMonth[];
}

interface ChartData {
    month: string;
    revenue: number;
    cogs: number;
    grossProfit: number;
}

function ProfitLossBar(props: BarShapeProps) {
    const { x, y, width, height, payload } = props;

    const profitLoss = Number(
        payload?.grossProfit ?? 0
    );

    const fill =
        profitLoss >= 0
            ? "#22c55e"
            : "#ef4444";


    return (
        <Rectangle
            {...props}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            radius={[6, 6, 6, 6]}
        />
    );
}

export default function RevenueChart({
    revenueByMonth,
}: RevenueChartProps) {
    const chartData: ChartData[] = revenueByMonth.map((item) => {

        const monthName = new Date(
            item._id.year,
            item._id.month - 1
        ).toLocaleString("en-IN", {
            month: "short",
        });

        return {
            month: `${monthName} ${item._id.year}`,
            revenue: item.revenue ?? 0,
            cogs: item.cogs ?? 0,
            grossProfit: item.grossProfit ?? 0,
        };
    });

    if (chartData.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Monthly Revenue & Profitability
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Compare revenue, costs and gross profit or loss generated
                    </p>
                </div>

                <div className="flex h-87.5 items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No revenue data available yet.
                    </p>
                </div>
            </div>
        );
    }

    const currentMonth = chartData[chartData.length - 1];
    const previousMonth = chartData.length > 1
        ? chartData[chartData.length - 2]
        : null;
    const currentProfit = currentMonth.grossProfit;
    const previousProfit = previousMonth?.grossProfit ?? null;
    const profitMargin = currentMonth.revenue > 0
        ? (currentProfit / currentMonth.revenue) * 100
        : 0;

    let comparisonText = "No previous month";
    let comparisonColor = "text-gray-500 dark:text-gray-400";

    if (previousProfit !== null && previousProfit !== 0) {
        const percentageChange = ((currentProfit - previousProfit) / Math.abs(previousProfit)) * 100;

        if (percentageChange >= 0) {
            comparisonText = `+${percentageChange.toFixed(1)}% vs previous month`;
            comparisonColor = "text-green-600 dark:text-green-400";
        } else {
            comparisonText = `${percentageChange.toFixed(1)}% vs previous month`;
            comparisonColor = "text-red-600 dark:text-red-400";
        }
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Monthly Revenue & Profitability
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Compare revenue, costs and gross profit or loss
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                        <p className="text-xs fon-medium text-gray-500 dark:text-gray-400">
                            {currentMonth.month}
                        </p>

                        <p
                            className={`mt-1 text-lg font-bold ${currentProfit >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                                }`}
                        >

                            {currentProfit >= 0
                                ? "Profit"
                                : "Loss"}{" "}

                            <AnimatedNumber
                                value={Math.abs(currentProfit)}
                                prefix="₹"
                            />
                        </p>

                        <p
                            className={`mt-1 text-xs font-medium${comparisonColor}`}
                        >
                            {comparisonText}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Revenue
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">

                        <AnimatedNumber
                            value={currentMonth.revenue}
                            prefix="₹"
                        />

                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        COGS
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">

                        <AnimatedNumber
                            value={currentMonth.cogs}
                            prefix="₹"
                        />

                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gross Margin
                    </p>

                    <p
                        className={`mt-1 text-lg font-bold ${currentProfit >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                            }`}
                    >

                        <AnimatedNumber
                            value={profitMargin}
                            suffix="%"
                            decimals={1}
                        />
                    </p>
                </div>
            </div>


            <div className="h-87.5 w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10,
                        }}
                        barGap={4}
                        barCategoryGap="20%"
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fontSize: 12,
                            }}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                            tickLine={false}
                            tickFormatter={(value) =>
                                `₹${Number(value).toLocaleString("en-IN")}`
                            }
                        />

                        <Tooltip
                            formatter={(
                                value, name
                            ) => {
                                const numericValue = Number(value);
                                const formattedValue = `₹${Math.abs(numericValue).toLocaleString("en-IN")}`;

                                if (name === "Gross Profit / Loss") {
                                    return [
                                        formattedValue,
                                        numericValue >= 0
                                            ? "Gross Profit"
                                            : "Gross Loss",
                                    ];
                                }

                                return [
                                    formattedValue,
                                    name,
                                ];
                            }}
                            labelFormatter={(label) => `Month: ${label}`}
                            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                        />

                        <Legend />

                        <ReferenceLine
                            y={0}
                            stroke="#6b7280"
                            strokeWidth={1.5}
                        />

                        <Bar
                            dataKey="revenue"
                            name="Revenue"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />

                        <Bar
                            dataKey="cogs"
                            name="COGS"
                            fill="#f59e0b"
                            radius={[6, 6, 0, 0]}
                            animationBegin={150}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />

                        <Bar
                            dataKey="grossProfit"
                            name="Gross Profit / Loss"
                            shape={ProfitLossBar}
                            radius={[6, 6, 0, 0]}
                            animationBegin={300}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
}