"use client";

import { useAdminStore } from "@/store/useAdminStore";
import toast from "react-hot-toast";
import { Package } from "@/store/useAdminStore";
import { Pencil, Trash } from "lucide-react";

interface Props {
    onEdit: (pkg: Package) => void;
}

export default function PackageList({ onEdit }: Props) {
    const { packages, deletePackage } = useAdminStore();

    if (packages.length === 0) {
        return (
            <>
                <h2 className="text-xl font-semibold my-5">Packages</h2>
                <p>No packages available.</p>
            </>
        )
    }

    return (
        <section className="border border-gray-700 rounded-md p-4">
            <h2 className="text-xl font-semibold my-5">Packages</h2>
            {/* package card  */}
            <div className="space-y-5">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="border p-6 rounded flex flex-col gap-8 shadow-md">
                        <div>
                            <h3 className="font-bold text-2xl text-black/70">{pkg.title}</h3>
                            {pkg.image && (
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-64 mt-2 rounded border mb-4"
                                />
                            )}
                            <p className="text-base text-gray-500">
                                Available: {new Date(pkg.availableDate).toLocaleDateString()}
                            </p>
                            <p className="text-justify">{pkg.description}</p>
                        </div>
                        <div className="space-x-5">
                            <button
                                onClick={() => onEdit(pkg)}
                                className="border border-green-400 rounded-sm p-2"
                            >
                                <Pencil size={24} className="text-green-500" />
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this package?")) {
                                        deletePackage(pkg.id);
                                        toast.success("Package deleted");
                                    }
                                }}
                                className="border border-red-400 rounded-sm p-2"
                            >
                                <Trash size={24} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
