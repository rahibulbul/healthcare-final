import React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';

const InsuranceClaim = () => {
    return (
        <div className='w-full h-[calc(100vh-65px)]'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
                <span className='text-3xl font-bold text-slate-600'>Request for insurance claim</span>
                <span className='text-base font-medium text-slate-500'>This page is to request for insurance claim</span>
            </div>
        </div>
    )
}

export default InsuranceClaim