import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';

const EMPRole = () => {
    const [employeeRole, setEmployeeRole] = useState("");

    const [employeeRoleName, setEmployeeRoleName] = useState("");

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
                <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
                <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
            </div>
            <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
                <div className="all-role">
                    <div className="flex w-full flex-col gap-5 mt-10">
                        <div className="flex w-full flex-row gap-5">
                            <div className="relative input w-[65%] md:w-[75%] flex items-center">
                                <input
                                    type="text"
                                    name="employeeRole"
                                    id="employeeRole"
                                    value={employeeRole}
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                />
                                <label
                                    htmlFor="employeeRole"
                                    className="absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base"
                                >
                                    Search employee role
                                </label>
                            </div>
                            <div className="flex-1 flex">
                                <button
                                    className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
                                >
                                    Create Role
                                </button>
                            </div>
                        </div>
                        <div className="flex w-full items-center">
                            <span className='w-full h-full text-center text-3xl font-bold text-slate-300'>No roles found</span>
                        </div>
                        <div className="role-list w-full md:w-[50%]">
                            <div className="">
                                <ul className='flex flex-col gap-2'>
                                    <li
                                        className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                    >
                                        <span className='flex gap-3 items-center'>
                                            <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
                                            <span>testrole</span>
                                        </span>
                                        <span className='flex gap-5 items-center mr-2'>
                                            <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                            <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                        </span>
                                    </li>
                                    <li
                                        className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                    >
                                        <span className='flex gap-3 items-center'>
                                            <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
                                            <span>testrole 2</span>
                                        </span>
                                        <span className='flex gap-5 items-center mr-2'>
                                            <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                            <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                        </span>
                                    </li>
                                    <li
                                        className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                    >
                                        <span className='flex gap-3 items-center'>
                                            <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
                                            <span>testrole 3</span>
                                        </span>
                                        <span className='flex gap-5 items-center mr-2'>
                                            <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                            <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="create-role bg-white w-full h-full mt-5 z-10 shadow-ui-bold p-5">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="create-role-sidebar h-full w-full md:w-80">
                                <div className="top flex justify-between mb-2">
                                    <span className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-300 rounded-full hover:bg-slate-600 hover:text-white'>
                                        <i class="fa-solid fa-left-long text-2xl "></i> Back
                                    </span>
                                    <span className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-300 rounded-full hover:bg-slate-600 hover:text-white'>
                                        <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
                                    </span>
                                </div>
                                <div className="new-role-list">
                                    <ul className='flex flex-col gap-2'>
                                        <li
                                            className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                        >
                                            <span>Owner</span>
                                        </li>
                                        <li
                                            className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                        >
                                            <span>CEO</span>
                                        </li>
                                        <li
                                            className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
                                        >
                                            <span>Manager</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="create-new-role w-full block md:flex-1">
                                <div className=" mb-2">
                                    <span className='font-semibold flex items-center text-xl mb-2'>
                                        Edit Role / New Role
                                    </span>
                                </div>
                                <div className="form">
                                    <form
                                    >
                                        <div className="permissions">
                                            <div className="relative input w-full md:w-[75%] flex items-center mt-3">
                                                <input
                                                    type="text"
                                                    name="employeeRoleName"
                                                    id="employeeRoleName"
                                                    value={employeeRoleName}
                                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                                />
                                                <label
                                                    htmlFor="employeeRole"
                                                    className="absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base"
                                                >
                                                    Employee role name
                                                </label>
                                            </div>
                                            <div className="w-[75%] mt-5 flex flex-col gap-2 permissions-list">
                                                <div className='w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row'>
                                                    <span className='flex-1 font-medium pl-5'>
                                                        Manage Roles
                                                    </span>
                                                    <span className='w-16 flex'>
                                                        <label htmlFor="manageRoleCheck" className='bg-gray-200 relative w-14 h-7 cursor-pointer rounded-full'>
                                                            <input type="checkbox" name="manageRoleCheck" id="manageRoleCheck" className='sr-only peer' />
                                                            <span className='w-5 h-5 bg-gray-400 rounded-full absolute left-1 top-1 peer-checked:left-8 transition-all duration-500'></span>
                                                        </label>
                                                    </span>
                                                </div>
                                                <div className='w-full p-2 cursor-pointer items-center flex border-2 border-slate-300 rounded-full flex-row'>
                                                    <span className='flex-1 font-medium pl-5'>
                                                        Manage Users
                                                    </span>
                                                    <span className='w-16 flex'>
                                                        <label htmlFor="manageUserCheck" className='bg-gray-200 relative w-14 h-7 cursor-pointer rounded-full'>
                                                            <input type="checkbox" name="manageUserCheck" id="manageUserCheck" className='sr-only peer' />
                                                            <span className='w-5 h-5 bg-gray-400 rounded-full absolute left-1 top-1 peer-checked:left-8 transition-all duration-500'></span>
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submit">
                                            <input type="submit" value="add role/edit role" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EMPRole
