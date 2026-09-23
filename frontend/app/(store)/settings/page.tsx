import Container from "@/components/common/Container";
import {
    FiMail,
    FiPhone,
    FiSettings,
    FiUser,
} from "react-icons/fi";
import Breadcrumb from "@/components/common/Breadcrumb";
import FadeUp from "@/components/animations/FadeUp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SettingsPage() {
    return (
        <ProtectedRoute>

            <main className="pt-28 pb-24">
                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            }, {
                                label: "Settings",
                            },
                        ]}
                    />

                    <FadeUp>

                        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 shadow dark:border-slate-700 dark:bg-slate-900">

                            <div className="mb-10 flex items-center gap-4">

                                <FiSettings
                                    size={35}
                                    className="text-blue-600"
                                />

                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Account Settings
                                </h1>

                            </div>

                            <div className="space-y-6">

                                <div className="rounded-xl border border-gray-200 p-5 dark:border-slate-700">

                                    <div className="mb-2 flex items-center gap-3">

                                        <FiUser className="text-blue-600" />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Name
                                        </span>

                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400">
                                        Vivek Singh
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-200 p-5 dark:border-slate-700">

                                    <div className="mb-2 flex items-center gap-3">

                                        <FiMail className="text-blue-600" />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Email
                                        </span>

                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400">
                                        vivekrawat70602441@gmail.com
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-200 p-5 dark:border-slate-700">

                                    <div className="mb-2 flex items-center gap-3">

                                        <FiPhone className="text-blue-600" />

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Phone
                                        </span>

                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400">
                                        +91 98373 57758
                                    </p>

                                </div>

                            </div>

                        </div>

                    </FadeUp>

                </Container>

            </main>
        </ProtectedRoute>
    );
}