"use client"

import React from 'react'
import DashboardForm from './DashboardForm'
import { useAdminStore } from '@/store/useAdminStore'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { clearAuthToken } from '@/utils/cookie'
import toast from 'react-hot-toast'

const DashBoardPage = () => {
    const router = useRouter()
    const { bookings } = useAdminStore()

    const handleLogOut = () => {
        try {
            clearAuthToken()
            toast.success("Logout Succesful")
            router.push("/admin/login")
        } catch (error) {
            toast.error("Logout Failed. Try again")
            console.log(error)
        }
    }

    return (
        <div className='w-full max-w-3xl mx-auto'>
            {/* Nav  */}
            <div className='p-5 flex items-center justify-between'>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <button
                    onClick={handleLogOut}
                    className='bg-black hover:bg-black/90 rounded-sm p-2'
                >
                    <LogOut size={24} className='text-white' />
                </button>
            </div>
            {/* form  */}
            <DashboardForm />

            {/* Bookings  */}
            <section className='border border-gray-700 rounded-md p-4 mt-6 space-y-6'>
                <h2 className="text-xl font-semibold my-5">Packages</h2>
                {
                    bookings.length === 0 ? <p>No Booking available</p> : (
                        bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className='border border-gray-300 shadow-md rounded-md p-4'
                            >
                                <strong>Name:</strong> <span>{booking.user.name}</span> <br />
                                <strong>Email:</strong> <span>{booking.user.email}</span> <br />
                                <strong>Phone:</strong> <span>{booking.user.phone}</span> <br />
                                <strong>Booking ID:</strong> <span>{booking.id}</span> <br />
                                <strong>Package ID:</strong> <span>{booking.packageId}</span> <br />
                            </div>
                        )))
                }
            </section>
        </div>
    )
}

export default DashBoardPage