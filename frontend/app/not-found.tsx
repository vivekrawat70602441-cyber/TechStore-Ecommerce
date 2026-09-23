import Link from "next/link";
import Container from "@/components/common/Container";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center pt-20 pb-20">
            <Container>

                <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow dark:border-slate-700 dark:bg-slate-900">

                    <FiAlertTriangle
                        size={80}
                        className="mx-auto mb-6 text-yellow-500"
                    />

                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                        404
                    </h1>

                    <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
                        Page Not Found
                    </h2>

                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        The page you&apos;re looking for doesn&apos;t exist
                        or may have been moved.
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </Container>
        </main>
    );
}