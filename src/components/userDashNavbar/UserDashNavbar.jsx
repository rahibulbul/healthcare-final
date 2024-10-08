
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginUserData } from "../../model/userHandle";
import { ToastContainer, toast, Slide } from 'react-toastify';

const DashNavbar = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const iconRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleIconClick = () => {
        setIsPanelOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target) &&
                !iconRef.current.contains(event.target)
            ) {
                setIsPanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [panelRef]);

    const handleCopy = () => {
        if (userData && userData.username) {
            navigator.clipboard.writeText(userData.username).then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 10000);
            });
        }
    };


    const navigate = useNavigate();
    const handleLogout = () => {
        toast.success("Logging out from this session . . .");
        sessionStorage.removeItem("userData");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    // Breadcrumb
    const pathMap = {
        "/users": "Dashboard",
        "/users/myinsurance": "My insurance",
        "/users/applyinsurance": "Apply for insurance",

    };
    const getPageName = (pathname) => {
        return pathMap[pathname] || "Page not found";
    };
    const createBreadcrumb = (pathname) => {
        const pathSegments = pathname.split("/").filter(Boolean);
        return pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isActive = path === location.pathname;
            return (
                <span key={path}>
                    <Link
                        to={path}
                        className={`text-base font-medium ${isActive ? "bg-slate-700 text-white" : "text-slate-700"} hover:bg-slate-700 hover:text-white duration-500 rounded-md p-2`}
                    >
                        {getPageName(path)}
                    </Link>
                    {index < pathSegments.length - 1 && " ❯ "}
                </span>
            );
        });
    };

    const handleBreadCrumbIconClick = () => {
        navigate("/employee");

    }
    const location = useLocation();
    const currentPath = location.pathname;
    const breadcrumb = createBreadcrumb(currentPath);

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const data = await LoginUserData();
            if (data) {
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }
    return (
        <header className='relative w-full h-16 shadow-ui-perfect flex justify-between items-center px-10'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            {/* Breadcrumb section, hidden on md and smaller screens */}
            <div className="flex-grow">
                <div className="hidden md:flex flex-row items-center">
                    <i class="ph ph-house-simple text-xl font-semibold cursor-pointer text-slate-700 hover:bg-slate-700 hover:text-white duration-500 rounded-md p-2" onClick={handleBreadCrumbIconClick}></i>
                    <span className=""> ❯ {breadcrumb}</span>
                </div>
            </div>

            {/* User Icon section */}
            <div className="relative">
                <div
                    ref={iconRef}
                    className={`relative border-2 border-slate-300 p-2 mr-0 rounded-full hover:bg-slate-600 hover:text-white text-slate-600 text-xl duration-500 cursor-pointer 
                        ${isPanelOpen ? 'bg-slate-600 text-white border-transparent' : ''}
                    `}
                    onClick={handleIconClick}
                >
                    <Icon icon="ph:user-bold" className={`${isPanelOpen ? 'text-white' : ''}`} />
                </div>

                {isPanelOpen && (
                    <div
                        ref={panelRef}
                        className="absolute user-panel top-full w-[300px] h-auto bg-white right-0 shadow-ui-bold z-50"
                    >
                        <div className="flex flex-col border-b-2 p-5">
                            <span className='text-2xl font-semibold mb-1 text-slate-700'>{userData.fullname}</span>
                            <span className='text-base font-semibold text-slate-600'>{userData.usercategory}</span>
                            <div className="flex items-center gap-1">
                                <span className='text-sm font-medium text-slate-600'>@{userData.username}</span>
                                {!isCopied && <i className='ph ph-copy cursor-pointer' onClick={handleCopy}></i>}
                                {isCopied && <i className='fa-solid fa-check-circle text-green-500'></i>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Link to="" className='flex p-3 flex-row items-center cursor-pointer hover:bg-slate-300 hover:pl-6 duration-300 text-gray-600 hover:text-black'><Icon icon="ph:bell-bold" className='mr-3' />Notification</Link>
                            <Link to="" className='flex p-3 flex-row items-center cursor-pointer hover:bg-slate-300 hover:pl-6 duration-300 text-gray-600 hover:text-black'><Icon icon="ph:gear-bold" className='mr-3' />Profile settings</Link>
                            <Link to="" className='flex p-3 flex-row items-center cursor-pointer hover:bg-slate-300 hover:pl-6 duration-300 text-gray-600 hover:text-black'><Icon icon="ph:lock-bold" className='mr-3' />Security and privacy</Link>
                            <Link onClick={handleLogout} className='flex p-3 flex-row items-center cursor-pointer hover:bg-slate-300 hover:pl-6 duration-300 text-gray-600 hover:text-black'><Icon icon="ri:logout-circle-r-line" className='mr-3' />Logout</Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DashNavbar;
