"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Package, useAdminStore } from "@/store/useAdminStore";

type Props = {
    open: boolean;
    onClose: () => void;
    pkg: Package | null;
    onSubmit: (user: { name: string; email: string; phone: string }) => void;
};

export default function BookingModal({ open, onClose, pkg }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (open) {
            setFormData({ name: "", email: "", phone: "" });
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pkg) return;

        const { name, email, phone } = formData;
        if (!name || !email || !phone) {
            toast.error("All fields are required");
            return;
        }

        const booking = {
            id: crypto.randomUUID(),
            packageId: pkg.id,
            user: { name, email, phone },
            date: new Date().toISOString(),
        };

        const addBooking = useAdminStore.getState().addBooking;
        addBooking(booking);

        toast.success("Booking successful!");
        onClose();
    };
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6 shadow-xl">
                            <Dialog.Title className="text-lg font-semibold mb-4">
                                Book Package:{" "}
                                <span className="text-black">{pkg?.title ?? "N/A"}</span>
                            </Dialog.Title>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="border border-gray-500 p-2 w-full rounded"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="border border-gray-500 p-2 w-full rounded"
                                    placeholder="Email Address"
                                />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="border border-gray-500 p-2 w-full rounded"
                                    placeholder="Phone Number"
                                />

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-gray-600 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-4 py-2 rounded hover:bg-black/90"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
