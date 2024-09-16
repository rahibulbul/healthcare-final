import React from 'react'

const EMPAllUsers = () => {
    return (
        <div className='w-full h-[calc(100vh-65px)]'>
            <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-50">
                <span className='text-3xl font-bold text-slate-600'>All users</span>
                <span className='text-base font-medium text-slate-500'>This page is to show all existing user to the company</span>
            </div>
            <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
            </div>
        </div>
    )
}

export default EMPAllUsers