export interface StatisticsOverview {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
}

export interface OrdersByStatus {
    Pending: number;
    Confirmed: number;
    Shipped: number;
    Delivered: number;
    Cancelled: number;
}

export interface RevenueByMonth {
    _id: {
        year: number;
        month: number;
    };

    revenue: number;
    cogs: number;
    grossProfit: number;
}

export interface AdminStatistics {
    message: string;
    overview: StatisticsOverview;
    ordersByStatus: OrdersByStatus;
    revenueByMonth: RevenueByMonth[];
}