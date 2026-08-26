import { apiClient } from "@/services/apiClient";
import { RevenueStats } from "../types/revenue";

export const adminRevenueService = {
    // Fetch total revenue and chart data
    getStats: async (): Promise<RevenueStats> => {
        try {
            const response = await apiClient.get('/api/admin/revenue/stats');
            const data = response?.data;
            return {
                totalRevenue: Number(data?.totalRevenue) || 0,
                chartData: Array.isArray(data?.chartData) ? data.chartData : [],
            };
        } catch (error) {
            console.error('Failed to fetch revenue stats:', error);
            return {
                totalRevenue: 0,
                chartData: [],
            };
        }
    }
};