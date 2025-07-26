"use client";

import { useAdminStore } from "@/store/useAdminStore";
import BookingCard from "@/components/BookingCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/SkeletonCard";

const Homepage = () => {

  const { packages, bookings, setBookings } = useAdminStore();
  const [loading, setLoading] = useState(true)

  const handleBooking = (packageId: string) => {
    const newBooking = {
      id: crypto.randomUUID(),
      packageId,
      user: "guest_user",
      date: new Date().toISOString(),
    };

    setBookings([...bookings, newBooking]);
    toast.success("You've booked destination.");
  };

  //loader simulatin
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gray-300 p-8">
      <h1 className="text-2xl font-bold mb-6">Available Packages</h1>

      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <p className="text-gray-600">No packages available at the moment.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <BookingCard key={pkg.id} pkg={pkg} onBook={handleBooking} />
          ))}
        </div>
      )}
    </section>
  );

}

export default Homepage