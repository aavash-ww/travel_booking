"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore, Package } from "@/store/useAdminStore";
import "react-datepicker/dist/react-datepicker.css";

export default function CreatePackageForm() {
    const { addPackage } = useAdminStore();

    const [formData, setFormData] = useState<Omit<Package, "id" | "availableDate"> & { availableDate: Date | null }>({
        title: "",
        description: "",
        image: "",
        places: [],
        availableDate: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.availableDate) {
            toast.error("Please select a date");
            return;
        }

        const newPkg: Package = {
            id: crypto.randomUUID(),
            ...formData,
            availableDate: formData.availableDate.toISOString(),
        };

        addPackage(newPkg);
        toast.success("Package created!");

        setFormData({
            title: "",
            description: "",
            image: "",
            places: [],
            availableDate: null,
        });
    };

    return (
        <section className="border border-gray-700 rounded-md p-4">
            <h2 className="text-xl font-semibold my-5">Add Package</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border border-gray-500 p-2 w-full rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border border-gray-500 p-2 w-full h-28 resize-none rounded"
                    required
                />
                <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="border border-gray-500 p-2 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Places (comma-separated)"
                    value={formData.places.join(", ")}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            places: e.target.value.split(",").map((s) => s.trim()),
                        })
                    }
                    className="border border-gray-500 p-2 w-full rounded"
                />
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
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-black/90 transition"
                >
                    Create Package
                </button>
            </form>
        </section>
    );
}
