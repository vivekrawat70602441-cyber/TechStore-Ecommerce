import type { AdminStatistics } from "@/types/statistics";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getAdminStatistics =
    async (): Promise<AdminStatistics> => {
        const response = await authFetch(
            `${API}/admin/statistics`,
            {
                method: "GET",

            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Failed to fetch admin statistics"
            );
        }
        return data;
    }
