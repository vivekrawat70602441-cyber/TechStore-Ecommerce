"use client";

import { SubmitEvent, useState } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
    onSend: (message: string) => void;
    disabled?: boolean;
};

export default function ChatInput({
    onSend, disabled = false
}: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const trimmedMessage = message.trim();

        if (!trimmedMessage || disabled) {
            return;
        }
        onSend(trimmedMessage);
        setMessage("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-200 p-3 dark:border-gray-700"
        >
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask me anything..."
                disabled={disabled}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-white dark:disabled:bg-slate-800"
            />

            <button
                type="submit"
                disabled={disabled || !message.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
            >
                <Send size={18} />
            </button>
        </form>
    );
}