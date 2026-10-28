"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { authFetch } from "@/lib/authFetch";
import type { OrderMapLocation } from "@/types/OrderTypes";

const OrderLocationMap = dynamic(
    () => import("./OrderLocationMap"),
    { ssr: false }
);

interface Warehouse {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface OrderLocationManagerProps {
    orderId: string;
    initialDispatchLocation?: OrderMapLocation;
    initialDeliveryLocation?: OrderMapLocation;
}

type LocationMode = "dispatch" | "delivery";

function hasValidCoordinates(
    location: OrderMapLocation | null
): location is OrderMapLocation {
    return Boolean(
        location &&
        Number.isFinite(location.latitude) &&
        Number.isFinite(location.longitude) &&
        location.latitude >= -90 &&
        location.latitude <= 90 &&
        location.longitude >= -180 &&
        location.longitude <= 180
    );
}

// DEMO DATA: Replace these examples with your real warehouse locations.
const WAREHOUSES: Warehouse[] = [
    {
        id: "warehouse-1",
        name: "Demo Warehouse - Delhi",
        address: "New Delhi, India",
        latitude: 28.6139,
        longitude: 77.209,
    },
    {
        id: "warehouse-2",
        name: "Demo Warehouse - Dehradun",
        address: "Dehradun, Uttarakhand, India",
        latitude: 30.3165,
        longitude: 78.0322,
    },
];

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OrderLocationManager({
    orderId,
    initialDispatchLocation,
    initialDeliveryLocation,
}: OrderLocationManagerProps) {
    const [mode, setMode] = useState<LocationMode>("dispatch");

    const [dispatch, setDispatch] = useState<OrderMapLocation | null>(
        initialDispatchLocation ?? null
    );

    const [delivery, setDelivery] = useState<OrderMapLocation | null>(
        initialDeliveryLocation ?? null
    );

    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    const selected = mode === "dispatch" ? dispatch : delivery;
    const setSelected = mode === "dispatch" ? setDispatch : setDelivery;

    function chooseWarehouse(warehouseId: string) {
        const warehouse = WAREHOUSES.find(
            (item) => item.id === warehouseId
        );

        if (!warehouse) return;

        setDispatch({
            name: warehouse.name,
            address: warehouse.address,
            latitude: warehouse.latitude,
            longitude: warehouse.longitude,
            source: "warehouse",
            warehouseId: warehouse.id,
        });

        setMode("dispatch");
        setMessage("");
    }

    function updateCoordinates(coordinates: {
        latitude: number;
        longitude: number;
    }) {
        const existing = selected;

        setSelected({
            name: existing?.name ?? (
                mode === "dispatch"
                    ? "Custom Dispatch Location"
                    : "Customer Delivery Location"
            ),
            address: existing?.address ?? "",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            source: mode === "dispatch" ? "custom" : undefined,
        });
        setMessage("");
    }

    function updateField(field: "name" | "address", value: string) {
        if (!selected) {
            setSelected({
                name: field === "name" ? value : "",
                address: field === "address" ? value : "",
                latitude: 0,
                longitude: 0,
                source: mode === "dispatch" ? "custom" : undefined,
            });
            return;
        }
        setSelected({ ...selected, [field]: value });
        setMessage("");
    }

    async function saveLocation() {
        if (!selected || !API) {
            setMessage("Select a point on the map first.");
            return;
        }

        if (!selected.name.trim() || !selected.address.trim()) {
            setMessage("Please enter the location name and address.");
            return;
        }

        if (!hasValidCoordinates(selected)) {
            setMessage("Please select valid coordinates on the map.");
            return;
        }

        setSaving(true);
        setMessage("");

        try {
            const endpoint = mode === "dispatch"
                ? `${API}/orders/admin/${orderId}/dispatch-location`
                : `${API}/orders/admin/${orderId}/delivery-location`;

            const body = mode === "dispatch"
                ? {
                    ...selected,
                    source: selected.source ?? "custom",
                    warehouseId: selected.source === "warehouse"
                        ? selected.warehouseId
                        : null,
                }
                : {
                    name: selected.name,
                    address: selected.address,
                    latitude: selected.latitude,
                    longitude: selected.longitude,
                };

            const response = await authFetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message ?? "Failed to save location.");
            }

            if (mode === "dispatch" && data.dispatchLocation) {
                setDispatch(data.dispatchLocation);
            }

            if (mode === "delivery" && data.deliveryLocation) {
                setDelivery(data.deliveryLocation);
            }

            setMessage("Loading saved successfully.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to save location."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="my-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Order Map Locations
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manually choose where the orders starts and where it will
                    be delivered. These are saved locations, not live GPS.
                </p>
            </div>

            <div className="mb-5 flex flex-wrap gap-3">
               <button
                 type="button"
                 onClick={() => {
                    setMode("dispatch");
                    setMessage("");
                 }}
                 className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    mode === "dispatch"
                       ? "bg-blue-600 text-white"
                       : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-200"
                 }`}
               >
                Dispatch location
               </button>

               <button
                 type="button"
                 onClick={() => {
                    setMode("delivery");
                    setMessage("");
                 }}
                 className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    mode === 'delivery'
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-200"
                 }`}
               >
                Customer location
               </button>
            </div>

            {mode === "dispatch" && (
                <div className="mb-5">
                    <label 
                         htmlFor="warehouse"
                         className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Choose a saved warehouse
                    </label>

                    <select 
                       id="warehouse"
                       defaultValue=""
                       onChange={(event) => chooseWarehouse(event.target.value)}
                       className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                       <option value="">Select warehouse...</option>
                       {WAREHOUSES.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </option>
                       ))}
                    </select>

                    <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                        The listed warehouses are demo examples. Replace their
                        names, addresses and coordinates with your actual locations.
                    </p>
                </div>
            )}

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location name
                    </label>
                    <input
                        value={selected?.name ?? ""}
                        onChange={(event) => 
                            updateField("name", event.target.value)
                        } 
                        placeholder="e.g. Main warehouse"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                     />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address or area
                    </label>
                    <input
                       value={selected?.address ?? ""}
                       onChange={(event) =>
                         updateField("address", event.target.value)
                       }
                       placeholder="Enter area or address"
                       className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                     />
                </div>
            </div>

            <OrderLocationMap
                key={mode}
                label={mode === "dispatch" ? "dispatch location" : "customer deivery location"}
                position={hasValidCoordinates(selected) ? {
                    latitude: selected.latitude,
                    longitude: selected.longitude,
                } : null}
                onPick={updateCoordinates}
            />

            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                {hasValidCoordinates(selected)
                    ? `Coordinates: ${selected.latitude.toFixed(5)}, ${selected.longitude.toFixed(5)}`
                    : "No valid coordinates. Click the map to place a pin."}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={saveLocation}
                  disabled={saving || !selected}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save location"}
                </button>

                {message && (
                    <p
                       role="status"
                       className="text-sm text-gray-700 dark:text-gray-300"
                    >
                       {message}
                    </p>
                )}
            </div>
        </section>
    );
}