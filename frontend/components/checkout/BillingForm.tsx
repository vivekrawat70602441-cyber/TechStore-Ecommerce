"use client";

import type { ShippingAddress } from "@/types/PaymentTypes";

interface BillingFormProps {
    billingData: ShippingAddress;

    setBillingData: React.Dispatch<
        React.SetStateAction<ShippingAddress>
    >;
}

export default function BillingForm({
    billingData,
    setBillingData,
}: BillingFormProps) {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            if ((e.target as HTMLElement).tagName === "TEXTAREA") return;

            e.preventDefault();

            const form = e.currentTarget;
            const formElements = Array.from(form.querySelectorAll("input, textarea, select, button")) as HTMLElement[];
            const currentIndex = formElements.indexOf(e.target as HTMLElement);

            if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
                formElements[currentIndex + 1].focus()
            }
        }
    }
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">

            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Billing Details
            </h2>

            <form className="grid gap-5" onKeyDown={handleKeyDown}>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your full name..."
                        value={billingData.fullName}
                        onChange={(e) =>
                            setBillingData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                    />
                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email..."
                        value={billingData.email}
                        onChange={(e) =>
                            setBillingData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                    />

                </div>
                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        placeholder="Enter your phone number..."
                        value={billingData.phone}
                        onChange={(e) =>
                            setBillingData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Enter your address..."
                        value={billingData.address}
                        onChange={(e) =>
                            setBillingData((prev) => ({
                                ...prev,
                                address: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                    />

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your City..."
                            value={billingData.city}
                            onChange={(e) =>
                                setBillingData((prev) => ({
                                    ...prev,
                                    city: e.target.value,
                                }))
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your State..."
                            value={billingData.state}
                            onChange={(e) =>
                                setBillingData((prev) => ({
                                    ...prev,
                                    state: e.target.value,
                                }))
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                        />

                    </div>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        PIN Code
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your PIN Code..."
                        value={billingData.pincode}
                        onChange={(e) =>
                            setBillingData((prev) => ({
                                ...prev,
                                pincode: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
                    />

                </div>
            </form>

        </div>
    );
}