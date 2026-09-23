"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const router = useRouter();

    const {
        user,
        loading,
    } = useAuth();

    useEffect(() => {

        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-xl">
                Loading...
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}