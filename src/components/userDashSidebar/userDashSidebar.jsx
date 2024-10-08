import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';

const UserDashSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
    const sidebarRef = useRef(null);
    const iconRef = useRef(null);
    const location = useLocation();

    const handleIconClick = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const toggleDropdown = (menu) => {
        setActiveDropdown((prev) => (prev === menu ? null : menu));
    };

    const handleNonDropdownClick = () => {
        // Close dropdown when a non-dropdown link is clicked
        setActiveDropdown(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !iconRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
                setActiveDropdown(null); // Close dropdown when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef]);

    const isPathActive = (path) => location.pathname === path;
    const handleLogout = () => {
        toast.success("Logging out from this session . . .");
        sessionStorage.removeItem("userData");
        setTimeout(() => {
            Navigate("/");
        }, 2000);
    };
    return (
        <>
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
                <div className="menu flex flex-col justify-between h-[calc(100vh-64px)] mt-16">
                    <div className="">
                        <ul>
                            <li>
                                <Link
                                    onClick={handleNonDropdownClick}
                                    to="/users"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/users') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-house-simple"></i>
                                    <span>Overview</span>
                                </Link>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('insurance')}
                                >
                                    <i className="ph ph-umbrella-simple"></i>
                                    <span>Insurance</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'insurance' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'insurance' || location.pathname.includes('/users/insurance') ? 'max-h-96' : 'max-h-0'}`} // Smooth animation
                                ><li>
                                        <Link to="/users/myinsurance"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/users/myinsurance') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>My insurance</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/users/applyinsurance"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/users/applyinsurance') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>Apply for insurance</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/users/insuranceclaim"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/users/insuranceclaim') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>Insurance Claim</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('appointment')}
                                >
                                    <i className="ph ph-calendar-check"></i>
                                    <span>Appointment</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'appointment' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'appointment' || location.pathname.includes('/employee/appointment') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link to="/employee/allappointment"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allappointment') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>All appointment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/addappointment"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addappointment') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>Add appointment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/awaitingappointment"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/awaitingappointment') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot"></i>
                                            <span>Awaiting for appointment</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <ul>
                            <li>
                                <Link
                                    to="/appsettings"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/appsettings') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-gear"></i>
                                    <span>App settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/users/profilesettings"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/profilesettings') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-user-gear"></i>
                                    <span>Profile settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={handleLogout}
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                >
                                    <i className='bx bx-log-out-circle'></i>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashSidebar;

