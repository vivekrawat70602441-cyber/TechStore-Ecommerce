import Container from "@/components/common/Container";
import Link from "next/link";
import {
    FiChevronRight,
    FiHeart,
    FiLogOut,
    FiPackage,
    FiSettings,
    FiUser,
} from "react-icons/fi";
import Breadcrumb from "@/components/common/Breadcrumb";
import FadeUp from "@/components/animations/FadeUp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
    return (
        <ProtectedRoute>

            <main className="pb-20 pt-28">
                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Profile",
                            },
                        ]}
                    />

                    <FadeUp>

                        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">

                            {/* Header */}

                            <div className="border-b border-gray-200 p-8 md:p-10 dark:border-slate-700">

                                <div className="flex items-center gap-5">

                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800">

                                        <FiUser
                                            size={40}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                            Vivek Singh
                                        </h1>

                                        <p className="text-gray-500 dark:text-gray-400">
                                            vivekrawat70602441@gmail.com
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Menu */}

                            <div className="space-y-4 p-6">

                                <Link
                                    href="/orders"
                                    className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >

                                    <div className="flex items-center gap-4">

                                        <FiPackage
                                            size={22}
                                            className="text-blue-600"
                                        />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            My Orders
                                        </span>

                                    </div>

                                    <FiChevronRight className="text-gray-500 dark:text-gray-400" />

                                </Link>

                                <Link
                                    href="/wishlist"
                                    className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >

                                    <div className="flex items-center gap-4">

                                        <FiHeart
                                            size={22}
                                            className="text-red-500"
                                        />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Wishlist
                                        </span>

                                    </div>

                                    <FiChevronRight className="text-gray-500 dark:text-gray-400" />

                                </Link>

                                <Link
                                    href="/settings"
                                    className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >

                                    <div className="flex items-center gap-4">

                                        <FiSettings
                                            size={22}
                                            className="text-gray-700 dark:text-gray-300"
                                        />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Account Settings
                                        </span>

                                    </div>

                                    <FiChevronRight className="text-gray-500 dark:text-gray-400" />

                                </Link>

                                <button
                                    className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    <div className="flex items-center gap-4">

                                        <FiLogOut
                                            size={22}
                                            className="text-red-500"
                                        />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Logout
                                        </span>

                                    </div>

                                    <FiChevronRight className="text-gray-500 dark:text-gray-400" />

                                </button>

                            </div>

                        </div>

                    </FadeUp>

                </Container>

            </main>

        </ProtectedRoute>
    );
}