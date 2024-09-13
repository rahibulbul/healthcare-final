"use client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const WebNavbar = () => {
    const [isClick, setIsClick] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { pathname } = window.location;
            setCurrentPath(pathname);
        }
    }, []);

    const toggleWebNavbar = () => {
        setIsClick(!isClick);
    };

    const isActive = (to) => currentPath === to;

    return (
        <nav className="bg-white w-full shadow-md fixed top-0 z-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-36">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link
                                to="/"
                                className="text-gray-500 font-semibold text-[26px] cursor-pointer hover:text-black duration-500 rounded-lg p-2"
                            >
                                HealthCare
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-10">
                            <Link
                                to="/"
                                className={`text-gray-500 font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/") ? "text-white bg-black" : ""
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`text-gray-500 font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/about") ? "text-white bg-black" : ""
                                    }`}
                            >
                                About
                            </Link>
                            <Link
                                to="/services"
                                className={`text-gray-500 font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/services") ? "text-white bg-black" : ""
                                    }`}
                            >
                                Services
                            </Link>
                            <Link
                                to="/contact"
                                className={`text-gray-500 font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/contact") ? "text-white bg-black" : ""
                                    }`}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/login"
                                className={`text-gray-500 font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/login") ? "text-white bg-black" : ""
                                    }`}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-black md:text-black hover:text-black focus:outline-none focus:right-2 focus:ring-inset focus:ring-black"
                            onClick={toggleWebNavbar}
                        >
                            {isClick ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease ${isClick ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-10 pt-2 pb-3 space-y-2 sm:px-3">
                    <Link
                        to="/"
                        className={`text-gray-500 block font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/") ? "text-white bg-black" : ""
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`text-gray-500 block font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/about") ? "text-white bg-black" : ""
                            }`}
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className={`text-gray-500 block font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/services") ? "text-white bg-black" : ""
                            }`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className={`text-gray-500 block font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/contact") ? "text-white bg-black" : ""
                            }`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        className={`text-gray-500 block font-semibold hover:text-white hover:bg-black duration-500 rounded-lg p-2 ${isActive("/login") ? "text-white bg-black" : ""
                            }`}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
        // <header className="">
        //     <div className="w-full flex items-center h-auto min-h-16 bg-white fixed top-0 left-0 z-10 shadow-ui-perfect">
        //         <div className="h-full w-full">
        //             <div className="logo">
        //                 HealthCare
        //             </div>
        //             <ul>
        //                 <li>
        //                     <Link to="">Home</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div className="absolute right-5">
        //             <i className="fa-solid fa-bars text-2xl text-slate-500 cursor-pointer"></i>
        //             <i className="fa-solid fa-close text-2xl text-slate-500 cursor-pointer"></i>
        //         </div>
        //     </div>
        // </header>
    );
};

export default WebNavbar;
