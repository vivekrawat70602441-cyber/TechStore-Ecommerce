"use client";

import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";
interface Coordinates {
    latitude: number;
    longitude: number;
}

interface OrderLocationMapProps {
    position: Coordinates | null;
    onPick: (coordinates: Coordinates) => void;
    label: string;
}

function MapClickHandler({ onPick }: {
    onPick: (coordinates: Coordinates) => void;
}) {
    useMapEvents({
        click(event) {
            onPick({
                latitude: event.latlng.lat,
                longitude: event.latlng.lng,
            });
        },
    });
    return null;
}

export default function OrderLocationMap({
    position,
    onPick,
    label,
}: OrderLocationMapProps) {
    const defaultCenter: [number, number] = [20.5937, 78.9629];
    const center: [number, number] = position
        ? [position.latitude, position.longitude]
        : defaultCenter;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
            <p className="bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                Click on the map to select: {label}
            </p>

            <MapContainer
                center={center}
                zoom={position ? 13 : 5}
                scrollWheelZoom
                style={{ height: "360px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onPick={onPick} />

                {position && (
                    <CircleMarker
                        center={[position.latitude, position.longitude]}
                        radius={9}
                        pathOptions={{
                            color: "#ffffff",
                            fillColor: "#2563eb",
                            fillOpacity: 1,
                            weight: 3,
                        }}
                    />
                )}
            </MapContainer>
        </div>
    );
}