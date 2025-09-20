import React from 'react'
import SkyQ_logo from "../../assets/SkyQ_logo.svg"
import { User, ClockFading, BookCheck, SquareCheckBig, CreditCard, CopyCheck, LogOut, CircleAlert } from 'lucide-react'

const Header = () => {
    return (
        <div className='w-full min-h-12 md:pl-4 flex flex-col md:flex-row items-center justify-between sticky top-0 bg-white z-10'>
            <img src={SkyQ_logo} alt="" className='w-14 pt-1 md:pt-0' />
            <div className='flex flex-col md:flex-row items-center gap-1 md:gap-3 m-auto pt-1 md:pt-0'>
                <div className='flex items-center gap-1'>
                    <span><User size={16} /></span>
                    <span className='text-sm font-semibold text-[#4f5050]'>8/12(13)</span>
                </div>

                <div className='flex items-center gap-1'>
                    <span><ClockFading size={16} /></span>
                    <span className=' text-sm font-semibold text-[#4f5050]'>53 Hours 22 Minutes (680%)</span>
                </div>
            </div>
        </div>
    )
}

export default Header
