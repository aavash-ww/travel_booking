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
  user: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
};

interface AdminStore {
  packages: Package[];
  bookings: Booking[];

  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;

  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      packages: [],
      bookings: [],

      addPackage: (pkg) => {
        const updated = [...get().packages, pkg];
        set({ packages: updated });
      },

      updatePackage: (updatedPkg) => {
        const updatedList = get().packages.map((pkg) =>
          pkg.id === updatedPkg.id ? updatedPkg : pkg
        );
        set({ packages: updatedList });
      },

      deletePackage: (id) => {
        const filtered = get().packages.filter((pkg) => pkg.id !== id);
        set({ packages: filtered });
      },

      setBookings: (bookings) => {
        set({ bookings });
      },

      addBooking: (booking) => {
        const updatedBookings = [...get().bookings, booking];
        set({ bookings: updatedBookings });
      },
    }),
    {
      name: "admin-storage",
    }
  )
);
