import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ProtectedRoute>

            <div className="min-h-screen bg-gray-50 dark:bg-slate-950">

                <AdminSidebar />

                <div className="ml-64 min-h-screen">
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}