import { Menu } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <header className='w-full max-w-[80%] mx-auto p-5'>
            <nav className='flex items-center justify-between'>
                <div className='relative h-[100px] w-[100px]'>
                    <Image src={"/logo.png"} alt='logo' fill className='object-cover rounded-full' priority />
                </div>
                <Menu size={48} className='text-gray-950' />
            </nav>
        </header>
    )
}

export default Navbar