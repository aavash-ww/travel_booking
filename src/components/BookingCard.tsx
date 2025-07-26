import { useState } from "react";
import { Package } from "@/store/useAdminStore";

interface BookingCardProps {
    pkg: Package;
    onBook: (pkgId: string) => void;
}

export default function BookingCard({ pkg, onBook }: BookingCardProps) {
    const [booked, setBooked] = useState(false);

    const handleBook = () => {
        onBook(pkg.id);
        setBooked(true);
    };

    return (
        <div className="bg-white border p-4 rounded-md shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>

            {pkg.image && (
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-40 object-cover rounded mb-2"
                />
            )}

            <p className="text-gray-600 text-sm mb-1">
                <strong>Available:</strong>{" "}
                {new Date(pkg.availableDate).toLocaleDateString()}
            </p>

            <p className="text-gray-800 mb-2">{pkg.description}</p>

            {pkg.places.length > 0 && (
                <p className="text-sm text-gray-700 mb-2">
                    <strong>Places:</strong> {pkg.places.join(", ")}
                </p>
            )}

            <button
                className={`mt-2 px-4 py-2 rounded transition ${booked
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-black/90"
                    }`}
                onClick={handleBook}
                disabled={booked}
            >
                {booked ? "Booked" : "Book Now"}
            </button>
        </div>
    );
}
