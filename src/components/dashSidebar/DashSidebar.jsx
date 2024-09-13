import React, { useEffect, useRef, useState } from 'react';

const DashSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const iconRef = useRef(null);

    const handleIconClick = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !iconRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef]);

    return (
        <>
            <div
                ref={iconRef}
                className="md:hidden absolute left-5 cursor-pointer z-50"
                style={{ top: '15px' }}
                onClick={handleIconClick}
            >
                {isSidebarOpen ? (
                    <i className="fa-solid fa-xmark text-3xl text-slate-700"></i>
                ) : (
                    <i className="fa-solid fa-bars-staggered text-3xl text-slate-700"></i>
                )}
            </div>
            <div
                ref={sidebarRef}
                className={`md:w-72 bg-white shadow-ui-bold md:shadow-none md:relative h-screen z-40 absolute right-0 top-0 overflow-y-auto transition-all duration-500 ease-in-out 
                ${isSidebarOpen ? 'w-72' : 'w-0'} `}
            >
                <div className="flex fixed flex-row w-72 bg-white items-center h-16 justify-center gap-5">
                    <i className="fa-solid fa-paper-plane text-2xl text-slate-700"></i>
                    <span className='text-2xl font-semibold text-slate-700'>HealthCare</span>
                </div>
                <div className="menu flex flex-col justify-between h-screen">
                    <div className="">
                        <ul></ul>
                    </div>
                    <div className="">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashSidebar;
