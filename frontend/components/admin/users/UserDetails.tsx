"use client";

import { AdminUser } from "@/types/user";

interface UserDetailsProps {
    user: AdminUser;
}

export default function UserDetails({
    user,
}: UserDetailsProps) {

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Account Information
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                    </p>

                    <p className="mt-1 font-medium text-gray-900 dark:text-white">
                        {user.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                    </p>

                    <p className="mt-1 font-medium text-gray-900 dark:text-white">
                        {user.email}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Role
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-lue-950/40 dark:text-blue-400">
                        {user.role}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Joined
                    </p>

                    <p className="mt-1 font-medium text-gray-900 dark:text-white">
                        {new Date(
                            user.createdAt
                        ).toLocaleDateString("en-IN")}
                    </p>
                </div>

                <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        User ID
                    </p>

                    <code className="mt-1 block break-all text-sm text-gray-700 dark:text-gray-300">
                        {user._id}
                    </code>
                </div>
            </div>
        </section>
    );
}