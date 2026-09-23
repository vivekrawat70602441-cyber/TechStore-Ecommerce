"use client";

import { SubmitEvent, useState } from "react";
import { AdminUser } from "@/types/user";
import { updateAdminUser } from "@/services/admin/userService";

interface UserEditFormProps {
    user: AdminUser;
    onSuccess: (user: AdminUser) => void;
    onCancel: () => void;
}

export default function UserEditForm({
    user,
    onSuccess,
    onCancel,
}: UserEditFormProps) {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState<
        "user" | "admin"
    >(user.role);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: SubmitEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            const updatedUser =
                await updateAdminUser(
                    user._id,
                    {
                        name,
                        email,
                        role,
                    }
                );
            onSuccess(updatedUser);
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update user"
            );
        } finally {
            setSaving(false);
        }
    };

    return (

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="m-6 text-xl font-semibold text-gray-900 dark:text-white">
                Edit User
            </h2>

            {error && (
                <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
                    />
                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Role
                    </label>
                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value as
                                "user" | "admin"
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                    >

                        <option value="user">
                            User
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                        className="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}