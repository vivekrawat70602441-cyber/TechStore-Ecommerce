"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import FadeUp from "@/components/animations/FadeUp";

import {
    FiMail,
    FiMapPin,
    FiPhone,
} from "react-icons/fi";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setSuccess(data.message);

            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pt-20 pb-20">
            <Container>

                <Breadcrumb
                    items={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Contact",
                        },
                    ]}
                />

                <div className="mb-12 text-center">

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Get in Touch
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        We&apos;d love to hear from you. Feel free to send us your
                        questions, feedback, or business inquiries.
                    </p>

                </div>

                <FadeUp>

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Contact Information */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                                Contact Information
                            </h2>

                            <div className="space-y-8">

                                <div className="flex items-start gap-4">

                                    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                        <FiMail
                                            size={22}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            Email
                                        </h3>

                                        <p className="text-gray-500 dark:text-gray-400">
                                            support@techstore.com
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-start gap-4">

                                    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                        <FiPhone
                                            size={22}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Phone
                                        </h3>

                                        <p className="text-gray-500">
                                            +91 98373 57758
                                        </p>
                                    </div>

                                </div>

                                <div className="flex  items-start gap-4">

                                    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                        <FiMapPin
                                            size={22}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            Address
                                        </h3>

                                        <p className="text-gray-500">
                                            Uttarakhand, India
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Contact Form */}

                        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                            <div className="space-y-2">

                                <label className="font-medium">
                                    Full Name
                                </label>

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter Your Name..."
                                    className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500"
                                />

                            </div>

                            <div className="space-y-2">

                                <label className="font-medium">
                                    Email Address
                                </label>

                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Enter Your Email..."
                                    className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500"

                                />

                            </div>

                            <div className="space-y-2">

                                <label className="font-medium text-gray-900 dark:text-white">
                                    Your Message
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Write your message..."
                                    className="w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-500"

                                />

                            </div>

                            {success && (
                                <p className="rounded-lg bg-green-100 p-3 text-green-700">
                                    {success}
                                </p>
                            )}

                            {error && (
                                <p className="rounded-lg bg-red-100 p-3 text-red-700">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                        </form>

                    </div>

                </FadeUp>

            </Container>

        </main >
    );
}