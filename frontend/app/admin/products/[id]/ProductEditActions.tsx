"use client";

import { Save } from "lucide-react";
interface ProductEditActionsProps {
    saving: boolean;
}

export default function ProductEditActions({
    saving,
}: ProductEditActionsProps) {
    return (
        <div className="mt-6 flex justify-end sm:mt-8">
            <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}