import { AdminUser, UserDetailsResponse } from "@/types/user";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getAdminUser(
    userId: string
): Promise<UserDetailsResponse> {

    const response = await authFetch(
        `${API}/users/admin/${userId}`,
        {
            method: "GET",

        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch user"
        );
    }
    return data;
}

export async function updateAdminUser(
    userId: string,
    userData: {
        name: string;
        email: string;
        role: "user" | "admin";
    }
): Promise<AdminUser> {

    const response = await authFetch(
        `${API}/users/admin/${userId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(userData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update user"
        );
    }
    return data.user;
}
