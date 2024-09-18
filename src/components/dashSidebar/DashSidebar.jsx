import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';

const DashSidebar = () => {
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
                                    to="/employee"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/employee') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-house-simple"></i>
                                    <span>Overview</span>
                                </Link>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('employees')}
                                >
                                    <i className="ph ph-users-three"></i>
                                    <span>Employees</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'employees' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'employees' || location.pathname.includes('/employee/employees') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link
                                            to="/employee/allemployees"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allemployees') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All employees</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/employee/addemployees"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addemployees') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Add employees</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/employeesrole"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/employeesrole') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Employees Roles</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/verifyemployees"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/verifyemployees') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting for verification</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('users')}
                                >
                                    <i className="ph ph-user"></i>
                                    <span>Users</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'users' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'users' || location.pathname.includes('/employee/users') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link
                                            to="/employee/allusers"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allusers') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All users</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/employee/addusers"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addusers') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Add users</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/userscategory"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/userscategory') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Users category</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/verifyusers"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/verifyusers') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting for verification</span>
                                        </Link>
                                    </li>
                                </ul>
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
                                    ${activeDropdown === 'insurance' || location.pathname.includes('/employee/insurance') ? 'max-h-96' : 'max-h-0'}`} // Smooth animation
                                >
                                    <li>
                                        <Link to="/employee/allinsurance"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allinsurance') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All insurance</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/addinsurance"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addinsurance') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Add insurance</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/insurancecategory"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/insurancecategory') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Insurance category</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/verifyinsurance"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/verifyinsurance') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting for verification</span>
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
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All appointment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/addappointment"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addappointment') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Add appointment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/verifyappointments"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/verifyappointments') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting for appointment</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('investors')}
                                >
                                    <i className="ph ph-coins"></i>
                                    <span>Investors</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'investors' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'investors' || location.pathname.includes('/employee/investors') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link to="/employee/allinvestors"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allinvestors') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All investors</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/addinvestors"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addinvestors') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Add investors</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/awaitinginvestors"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/awaitinginvestors') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting for verification</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('bills')}
                                >
                                    <i className="ph ph-credit-card"></i>
                                    <span>Bills and expense</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'bills' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'bills' || location.pathname.includes('/employee/bills') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link to="/employee/allbills"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allbills') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All bills</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/allexpense"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/allexpense') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All expense</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/addbills"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/addbills') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Create bills</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/verifybills"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/verifybills') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Awaiting bills</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div
                                    className='flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500 text-slate-500 hover:bg-slate-300 hover:text-black hover:px-8'
                                    onClick={() => toggleDropdown('report')}
                                >
                                    <i className="ph ph-clipboard-text"></i>
                                    <span>Reports</span>
                                    <i
                                        className={`fa-solid fa-sort-down absolute right-3 transition-transform duration-300 ease-in-out
                                        ${activeDropdown === 'report' ? 'rotate-180' : ''}`}
                                    ></i>
                                </div>
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${activeDropdown === 'report' || location.pathname.includes('/employee/report') ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <li>
                                        <Link to="/employee/companyreport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/companyreport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Company reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/userreport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/userreport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Users reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/employeereport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/employeereport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Employees reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/employeesalaryreport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/employeesalaryreport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Employee Salary</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/insurancereport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/insurancereport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Insurance reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/appointmentsreport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/appointmentsreport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Appointments reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/investorsreport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/investorsreport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>Investors reports</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/billsandexpensereport"
                                            className={`flex items-center px-7 py-2 gap-4 text-sm font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-9
                                            ${isPathActive('/employee/billsandexpensereport') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                        >
                                            <i className="ph ph-dot-outline"></i>
                                            <span>All bills and Expenses</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10">
                        <ul>
                            <li>
                                <Link
                                    to="/employee/profilesettings"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/employee/profilesettings') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-user-gear"></i>
                                    <span>Profile settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/employee/security"
                                    className={`flex items-center px-5 py-3 gap-4 text-base font-medium cursor-pointer duration-500  hover:bg-slate-300 hover:text-black hover:px-8
                                    ${isPathActive('/employee/security') ? 'bg-slate-300 text-black' : 'text-slate-500'}`}
                                >
                                    <i className="ph ph-lock"></i>
                                    <span>Security and privacy</span>
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
            </div >
        </>
    );
};

export default DashSidebar;

