"use client"

import FloatingBox from '@/app/(home)/_components/floatin-box'
import React from 'react'
import { motion } from 'framer-motion';


const AuthBanner = ({ title }: { title: string }) => {
    return (
        <div className='min-h-52 lg:h-full flex justify-center items-center bg-accent sm:rounded-[32px]
        px-4 py-12 border border-border __bg-hero relative overflow-hidden'>

            <motion.h1 
                className='text-4xl font-semibold text-center relative z-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {title}
                <div className="h-1 w-20 bg-primary mx-auto mt-2 rounded-full" />
            </motion.h1>
            
            <FloatingBox initialPosition="-5%"  className="absolute left-0 top-0 bg-[#ffcc00] shadow-xl rounded-xl"/>
            <FloatingBox initialPosition="5%" className="absolute right-5 bottom-0 bg-[#ff99cc] shadow-2xl rounded-lg"/>
            <FloatingBox initialPosition="-5%" className="absolute right-40 top-20 bg-[#99ccff] shadow-lg rounded-2xl"/>
            <FloatingBox initialPosition="-5%" className="absolute left-40 bottom-20 bg-[#b2ff66] shadow-md rounded-md"/>
        </div>
    )
}

export default AuthBanner;
