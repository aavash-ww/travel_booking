"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";
import { Package, useAdminStore } from "@/store/useAdminStore";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    open: boolean;
    onClose: () => void;
    pkg: Package | null;
};

export default function EditPackageModal({ open, onClose, pkg }: Props) {
    const { updatePackage } = useAdminStore();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        places: [] as string[],
        availableDate: null as Date | null,
    });

    useEffect(() => {
        if (pkg) {
            setFormData({
                title: pkg.title,
                description: pkg.description,
                image: pkg.image,
                places: pkg.places,
                availableDate: new Date(pkg.availableDate),
            });
        }
    }, [pkg]);

    const handleUpdate = () => {
        if (!formData.availableDate || !pkg) {
            toast.error("All fields required");
            return;
        }

        const updated: Package = {
            ...pkg,
            ...formData,
            availableDate: formData.availableDate.toISOString(),
        };

        updatePackage(updated);
        toast.success("Package updated");
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
                            <Dialog.Title className="text-lg font-semibold mb-4">Edit Package</Dialog.Title>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="border border-gray-500 p-2 w-full"
                                    placeholder="Title"
                                />
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="border border-gray-500 p-2 w-full h-24 resize-none rounded"
                                    placeholder="Description"
                                />
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="border border-gray-500 p-2 w-full"
                                    placeholder="Image URL"
                                />
                                <input
                                    type="text"
                                    value={formData.places.join(", ")}
                                    onChange={(e) =>
                                        setFormData({ ...formData, places: e.target.value.split(",").map((s) => s.trim()) })
                                    }
                                    className="border border-gray-500 p-2 w-full"
                                    placeholder="Places"
                                />
                                {/* date  */}
                                <div className="relative">
                                    <DatePicker
                                        selected={formData.availableDate}
                                        onChange={(date) => setFormData({ ...formData, availableDate: date })}
                                        minDate={new Date()}
                                        className="w-full border border-gray-500 p-2 pl-10 rounded"
                                        placeholderText="Select Available Date"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <div className="absolute top-2.5 left-3 text-gray-500 pointer-events-none">
                                        <Calendar size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button onClick={onClose} className="text-gray-600 hover:underline">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-black text-white px-4 py-2 rounded hover:bg-black/90"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
