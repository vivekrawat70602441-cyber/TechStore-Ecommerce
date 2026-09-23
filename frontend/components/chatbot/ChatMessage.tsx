type ChatMessageProps = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatMessage({
    role, content
}: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div
           className={`flex ${
              isUser ? "justify-end" : "justify-start"
           }`}
        >
            <div
               className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                   isUser
                       ? "bg-black text-white dark:bg-white dark:text-black"
                       : "bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-gray-100"
               }`}
            >
                {content}
            </div>
        </div>
    );
}