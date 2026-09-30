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

                <div className="ml-0 min-h-screen md:ml-64">
                    <main className="p-4 pt-20 sm:p-6 sm:pt-20 md:p-8 md:pt-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}