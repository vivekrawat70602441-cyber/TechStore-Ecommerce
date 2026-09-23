"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-xl border p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === "light" ? (
                <Moon size={20} />
            ) : (
                <Sun size={20} />
            )}
        </button>
    );
}