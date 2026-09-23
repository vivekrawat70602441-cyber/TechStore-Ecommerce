"use client";

import { Save } from "lucide-react";
interface ProductEditActionsProps {
    saving: boolean;
}

export default function ProductEditActions({
    saving,
}: ProductEditActionsProps) {
    return (
        <div className="mt-8 flex justify-end">
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={18} />
                {saving
                    ? "Saving..."
                    : "Save Changed"}
            </button>
        </div>
    );
}