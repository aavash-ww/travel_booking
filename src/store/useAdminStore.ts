import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Package = {
  id: string;
  title: string;
  description: string;
  image: string;
  places: string[];
  availableDate: string;
};

export type Booking = {
  id: string;
  packageId: string;
  user: string;
  date: string;
};

interface AdminStore {
  packages: Package[];
  bookings: Booking[];

  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;

  setBookings: (bookings: Booking[]) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      packages: [],
      bookings: [],

      addPackage: (pkg) => set({ packages: [...get().packages, pkg] }),

      updatePackage: (updated) =>
        set({
          packages: get().packages.map((pkg) =>
            pkg.id === updated.id ? updated : pkg
          ),
        }),

      deletePackage: (id) =>
        set({ packages: get().packages.filter((p) => p.id !== id) }),

      setBookings: (bookings) => set({ bookings }),
    }),
    {
      name: "admin-storage",
    }
  )
);
