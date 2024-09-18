import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';

const EMPList = () => {
    return (
        <div className='w-full h-[calc(100vh-65px)]'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
                <span className='text-3xl font-bold text-slate-600'>All Employees</span>
                <span className='text-base font-medium text-slate-500'>This page is to show all existing employee to the company</span>
            </div>
            <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">

            </div>
        </div>
    )
}

export default EMPList