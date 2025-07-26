"use client";

import { useState } from "react";
import { Package } from "@/store/useAdminStore";
import EditPackageModal from "./EditPackageModal";
import CreatePackageForm from "./CreatePackageForm";
import PackageList from "./PackageList";

export default function DashboardForm() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const handleEdit = (pkg: Package) => {
        setSelectedPackage(pkg);
        setEditModalOpen(true);
    };

    return (
        <>
            <div className="space-y-6">
                <CreatePackageForm />
                <PackageList onEdit={handleEdit} />
            </div>
            <EditPackageModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                pkg={selectedPackage}
            />
        </>
    );
}
