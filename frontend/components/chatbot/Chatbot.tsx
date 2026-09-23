"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "../chatbot/ChatWindow";
import { useAuth } from "@/context/AuthContext";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {isOpen && (
                <ChatWindow
                    onClose={() => setIsOpen(false)}
                />
            )}

            <button
                onClick={() => setIsOpen((previous) => !previous)}
                className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-105 sm:right-5 sm:bottom-5 dark:bg-white dark:text-black dark:shadow-black/30"
                aria-label={
                    isOpen
                        ? "Close chatbot"
                        : "Open chatbot"
                }
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MessageCircle size={24} />
                )}
            </button>
        </>
    );
}