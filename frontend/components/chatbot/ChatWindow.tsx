"use client";

import { useState } from "react";
import { X, Bot } from "lucide-react";
import ChatMessage from "../chatbot/ChatMessage";
import ChatInput from "../chatbot/ChatInput";
import { sendChatMessage } from "@/services/chatService";

type Message = {
    role: "user" | "assistant";
    content: string;
};

type ChatWindowProps = {
    onClose: () => void;
};

export default function ChatWindow({
    onClose,
}: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hii! I'm your TechStore assistant. How can I help you?",
        },
    ]);

    const [loading, setLoading] = useState(false);
    const handleSend = async (message: string) => {
        const userMessage: Message = {
            role: "user",
            content: message,
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            userMessage,
        ]);

        setLoading(true);

        try {
            const response = await sendChatMessage(message);
            const assistantMessage: Message = {
                role: "assistant",
                content: response,
            };

            setMessages((previousMessages) => [
                ...previousMessages,
                assistantMessage,
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
                <div className="fixed right-4 bottom-20 z-50 flex h-[min(31.25rem,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-87.5 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-2xl sm:right-5 sm:bottom-24 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100 dark:shadow-black/40">

                    <div className="flex items-center justify-between bg-black px-4 py-4 text-white dark:bg-white dark:text-black">
            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 dark:bg-black/10">
                    <Bot size={20} />
                </div>

                <div>
                    <h2 className="font-semibold">
                        TechStore AI
                    </h2>

                    <p className="text-xs opacity-70">
                        Online
                    </p>
                </div>
            </div>

            <button
                  onClick={onClose}
                  className="rounded-full p-2 transition hover:bg-white/20"
            >
                <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
               {messages.map((message, index) => (
                    <ChatMessage
                         key={index}
                         role={message.role}
                         content={message.content}
                    />
               ))}

               {loading && (
                    <ChatMessage
                       role="assistant"
                       content="Thinking..."
                    />
               )}
          </div>

          <ChatInput
            onSend={handleSend}
            disabled={loading}
          />
        </div>
    );
}
