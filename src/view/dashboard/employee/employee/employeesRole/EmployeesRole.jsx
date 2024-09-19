// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { addNewRoleToDatabase, updateRoleInDatabase } from "../../../../../model/employeeDash"

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");

//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);

//     const [isAddButtonClick, setIsAddButtonClick] = useState(false);

//     const [roles, setRoles] = useState([]);
//     const [newRole, setNewRole] = useState("");

//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     const handleAddNewRole = () => {
//         setRoles([...roles, "New Role"]);
//         setActiveRoleIndex(roles.length);
//         setEmployeeRoleName("New Role");
//     };

//     const handleRoleClick = (index) => {
//         setActiveRoleIndex(index);
//         setEmployeeRoleName(roles[index]);
//     };

//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex] = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee",
//         'View employee list',
//         'Manage employees',
//         'Manage employee roles',
//         'Verify employee',
//         "View user",
//         'View user list',
//         'Manage users',
//         'Manage user roles',
//         'Verify users',
//         "View insurance",
//         'View insurance list',
//         "Manage insurance",
//         "Manage insurance category",
//         'Verify insurance',
//         "View appointments",
//         "View appointments list",
//         "Manage appointments",
//         "Verify appointments",
//         "View investors",
//         "View investors list",
//         "Manage investors",
//         "Verify investors",
//         "View bills and expense",
//         "View bills list",
//         "View expense list",
//         "Create bills",
//         "Verify bills",
//         "View reports",
//         "View users reports",
//         "View employees reports",
//         "View insurance reports",
//         "View company reports",
//         "View appointments reports",
//         "View investors reports",
//         "View bills and expense reports",
//         "View employee salary reports",
//     ];

//     const compactPermissions = {
//         employee: {
//             view: true,
//             view_list: true,
//             manage: true,
//             manage_roles: true,
//             verify: true,
//         },
//         user: {
//             view: true,
//             view_list: true,
//             manage: true,
//             manage_roles: true,
//             verify: true,
//         },
//         insurance: {
//             view: true,
//             view_list: true,
//             manage: true,
//             manage_category: true,
//             verify: true,
//         },
//         appointments: {
//             view: true,
//             view_list: true,
//             manage: true,
//             verify: true,
//         },
//         investors: {
//             view: true,
//             view_list: true,
//             manage: true,
//             verify: true,
//         },
//         bills_and_expense: {
//             view: true,
//             view_bills_list: true,
//             view_expense_list: true,
//             create_bills: true,
//             verify_bills: true,
//         },
//         reports: {
//             view_users: true,
//             view_employees: true,
//             view_insurance: true,
//             view_company: true,
//             view_appointments: true,
//             view_investors: true,
//             view_bills_and_expense: true,
//             view_employee_salary: true,
//         }
//     };

//     // const defaultPermissions = expandedPermissions.reduce((acc, permission) => {
//     //     acc[permission] = false;
//     //     return acc;
//     // }, {});

//     const expandedPermissions = [];
//     for (const category in compactPermissions) {
//         for (const action in compactPermissions[category]) {
//             if (compactPermissions[category][action]) {
//                 expandedPermissions.push(`${capitalize(action)} ${capitalize(category)}`);
//             }
//         }
//     }

//     function capitalize(str) {
//         return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
//     }

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         {/* <div className="flex w-full items-center">
//                             <span className='w-full h-full text-center text-3xl font-bold text-slate-300'>No roles found</span>
//                         </div> */}
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole</span>
//                                         </span>
// <span className='flex gap-5 items-center mr-2'>
//     <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//     <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
// </span>
//                                     </li>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole 2</span>
//                                         </span>
//                                         <span className='flex gap-5 items-center mr-2'>
//                                             <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                         </span>
//                                     </li>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole 3</span>
//                                         </span>
//                                         <span className='flex gap-5 items-center mr-2'>
//                                             <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                         </span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Owner</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>CEO</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Manager</span>
//                                         </li>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}  // Highlight active role
//                                             >
//                                                 <span>{role}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form
//                                     >
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             {/* <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]} // Toggle permissions dynamically
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div> */}
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {expandedPermissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="add role/edit role"
//                                                 className='border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white'
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole

// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles } from "../../../../../model/employeeDash"

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");

//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);

//     const [isAddButtonClick, setIsAddButtonClick] = useState(false);

//     const [roles, setRoles] = useState([]);
//     const [newRole, setNewRole] = useState("");

//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     const handleAddNewRole = () => {
//         setRoles([...roles, "New Role"]);
//         setActiveRoleIndex(roles.length);
//         setEmployeeRoleName("New Role");
//     };

//     const handleRoleClick = (index) => {
//         setActiveRoleIndex(index);
//         setEmployeeRoleName(roles[index]);
//     };

//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex] = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee",
//         'View employee list',
//         'Manage employees',
//         'Manage employee roles',
//         'Verify employee',
//         "View user",
//         'View user list',
//         'Manage users',
//         'Manage user roles',
//         'Verify users',
//         "View insurance",
//         'View insurance list',
//         "Manage insurance",
//         "Manage insurance category",
//         'Verify insurance',
//         "View appointments",
//         "View appointments list",
//         "Manage appointments",
//         "Verify appointments",
//         "View investors",
//         "View investors list",
//         "Manage investors",
//         "Verify investors",
//         "View bills and expense",
//         "View bills list",
//         "View expense list",
//         "Create bills",
//         "Verify bills",
//         "View reports",
//         "View users reports",
//         "View employees reports",
//         "View insurance reports",
//         "View company reports",
//         "View appointments reports",
//         "View investors reports",
//         "View bills and expense reports",
//         "View employee salary reports",
//     ];

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));
//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     // Submit function to send the role and permissions to the database
//     const handleSubmit = async (e) => {
//         e.preventDefault();  // Prevent the default form submission behavior

//         try {
//             // Create an object with all permissions set based on toggle values
//             const rolePermissions = permissions.reduce((acc, permission, index) => {
//                 acc[permission] = toggles[index];
//                 return acc;
//             }, {});

//             // Call AddEmployeeRoles to add the new role to the database
//             const RoleID = await AddEmployeeRoles({
//                 roleName: employeeRoleName || "Untitled Role",
//                 permissions: rolePermissions
//             });

//             // Show success message
//             toast.success("Role successfully added.");

//             // Reset the form fields and toggles
//             setEmployeeRoleName("");
//             setToggles(Array(permissions.length).fill(false));

//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to add role. Please try again.");
//         }
//     };

//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole</span>
//                                         </span>
//                                         <span className='flex gap-5 items-center mr-2'>
//                                             <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                         </span>
//                                     </li>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole 2</span>
//                                         </span>
//                                         <span className='flex gap-5 items-center mr-2'>
//                                             <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                         </span>
//                                     </li>
//                                     <li
//                                         className='p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                     >
//                                         <span className='flex gap-3 items-center'>
//                                             <i class="fa-solid fa-grip-vertical cursor-pointer"></i>
//                                             <span>testrole 3</span>
//                                         </span>
//                                         <span className='flex gap-5 items-center mr-2'>
//                                             <i class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             <i class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                         </span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Owner</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>CEO</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Manager</span>
//                                         </li>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}  // Highlight active role
//                                             >
//                                                 <span>{role}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="add role/edit role"
//                                                 className='border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white'
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole

// import React, { useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles } from "../../../../../model/employeeDash"

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");

//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);

//     const [roles, setRoles] = useState([]);
//     const [newRole, setNewRole] = useState(null); // Track the new role (object with name & permissions)
//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     // Add button to add a new role locally
//     const handleAddNewRole = () => {
//         const newRoleObject = {
//             roleName: "New Role",
//             permissions: Array(permissions.length).fill(false)
//         };
//         setRoles([...roles, newRoleObject]);
//         setActiveRoleIndex(roles.length);
//         setEmployeeRoleName("New Role");
//         setNewRole(newRoleObject); // Store the newly added role
//     };

//     const handleRoleClick = (index) => {
//         setActiveRoleIndex(index);
//         setEmployeeRoleName(roles[index].roleName); // Display the role name for editing
//     };

//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         // Update the role name in the roles array
//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex].roleName = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
//         "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
//         "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
//         "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
//         "View investors", "View investors list", "Manage investors", "Verify investors",
//         "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
//         "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
//         "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports"
//     ];

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     // Submit function to send the role and permissions to the database
//     const handleSubmit = async (e) => {
//         e.preventDefault();  // Prevent default form submission behavior

//         // Prevent submission if the role name is empty
//         if (!employeeRoleName || employeeRoleName.trim() === "" || employeeRoleName === "New Role") {
//             toast.error("Please add a valid role name before submitting.");
//             return;
//         }

//         // Prevent multiple submissions
//         if (isSubmitting) {
//             return;
//         }

//         setIsSubmitting(true); // Set submitting state to true

//         try {
//             // Create an object with all permissions set based on toggle values
//             const rolePermissions = permissions.reduce((acc, permission, index) => {
//                 acc[permission] = toggles[index];
//                 return acc;
//             }, {});

//             // Call AddEmployeeRoles to add the new role to the database
//             const RoleID = await AddEmployeeRoles({
//                 roleName: employeeRoleName,
//                 permissions: rolePermissions
//             });

//             // Show success message
//             toast.success("Role successfully added.");

//             // Reset the form fields and toggles
//             setEmployeeRoleName("");
//             setToggles(Array(permissions.length).fill(false));

//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to add role. Please try again.");
//         } finally {
//             setIsSubmitting(false); // Re-enable submit button after completion
//         }
//     };

//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     {roles.map((role, index) => (
//                                         <li
//                                             key={index}
//                                             onClick={() => handleRoleClick(index)}
//                                             className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                                                 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                         >
//                                             <span>{role.roleName}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Owner</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>CEO</span>
//                                         </li>
//                                         <li
//                                             className='p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300'
//                                         >
//                                             <span>Manager</span>
//                                         </li>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}  // Highlight active role
//                                             >
//                                                 <span>{role.roleName}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="add role/edit role"
//                                                 className={`border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 disabled={isSubmitting}
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole;



// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles, FetchEmployeeRoles } from "../../../../../model/employeeDash"
// import { ref, update, get } from 'firebase/database';
// import { database } from "../../../../../model/firebaseConfig";

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");

//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);

//     const [roles, setRoles] = useState([]);
//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
//     const [currentRoleId, setCurrentRoleId] = useState(null); // To track if editing a role or adding a new one

//     // Fetch roles from database when component mounts
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const rolesData = await FetchEmployeeRoles();  // Fetch roles from Firebase
//                 const rolesArray = Object.keys(rolesData).map(roleId => ({
//                     id: roleId,
//                     ...rolesData[roleId]
//                 }));
//                 setRoles(rolesArray);  // Update roles state with fetched data
//             } catch (error) {
//                 console.error("Error fetching roles:", error);
//                 toast.error("Failed to fetch roles.");
//             }
//         };

//         fetchRoles();  // Call the fetch function
//     }, []);  // Empty dependency array ensures it runs only once on component mount

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//         setCurrentRoleId(null);  // Reset currentRoleId when creating a new role
//         setEmployeeRoleName("");  // Reset role name
//         setToggles(Array(permissions.length).fill(false));  // Reset toggles
//     };

//     const handleAddNewRole = () => {
//         const newRoleObject = {
//             roleName: "New Role",
//             permissions: Array(permissions.length).fill(false)
//         };
//         setRoles([...roles, newRoleObject]);
//         setActiveRoleIndex(roles.length);
//         setEmployeeRoleName("New Role");
//     };

//     // Handle pencil click to edit the role
//     const handleEditRole = async (roleId, index) => {
//         try {
//             const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
//             const snapshot = await get(roleRef);
//             if (snapshot.exists()) {
//                 const roleData = snapshot.val();
//                 setEmployeeRoleName(roleData.roleName);  // Populate the form with the role's name

//                 // Sync the permissions toggles with the fetched data
//                 const fetchedPermissions = roleData.permissions;
//                 const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
//                 setToggles(newToggles);  // Update the toggles with fetched values

//                 setCurrentRoleId(roleId);  // Set currentRoleId to update the role later
//                 setActiveRoleIndex(index);  // Highlight active role
//                 setIsCreateRoleOpen(true);  // Open the edit form
//             } else {
//                 toast.error("Role not found.");
//             }
//         } catch (error) {
//             console.error("Error fetching role:", error);
//             toast.error("Failed to fetch role.");
//         }
//     };


//     const handleRoleClick = async (index) => {
//         const selectedRole = roles[index];
//         try {
//             const roleRef = ref(database, `healthcare/employeeroles/${selectedRole.id}`);
//             const snapshot = await get(roleRef);
//             if (snapshot.exists()) {
//                 const roleData = snapshot.val();
//                 setEmployeeRoleName(roleData.roleName);  // Populate the form with the role's name

//                 // Sync the permissions toggles with the fetched data
//                 const fetchedPermissions = roleData.permissions;
//                 const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
//                 setToggles(newToggles);  // Update the toggles with fetched values

//                 setCurrentRoleId(selectedRole.id);  // Set currentRoleId to update the role later
//                 setActiveRoleIndex(index);  // Highlight active role
//                 setIsCreateRoleOpen(true);  // Open the edit form
//             } else {
//                 toast.error("Role not found.");
//             }
//         } catch (error) {
//             console.error("Error fetching role:", error);
//             toast.error("Failed to fetch role.");
//         }
//     };


//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex].roleName = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
//         "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
//         "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
//         "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
//         "View investors", "View investors list", "Manage investors", "Verify investors",
//         "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
//         "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
//         "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports"
//     ];

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     // Submit function to handle both add and update
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!employeeRoleName || employeeRoleName.trim() === "") {
//             toast.error("Please add a valid role name before submitting.");
//             return;
//         }

//         if (isSubmitting) {
//             return;
//         }

//         setIsSubmitting(true);

//         const rolePermissions = permissions.reduce((acc, permission, index) => {
//             acc[permission] = toggles[index];  // Use the correct toggle values
//             return acc;
//         }, {});

//         try {
//             if (currentRoleId) {
//                 // Update existing role
//                 const roleRef = ref(database, `healthcare/employeeroles/${currentRoleId}`);
//                 await update(roleRef, {
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 toast.success("Role updated successfully.");
//             } else {
//                 // Add new role
//                 const RoleID = await AddEmployeeRoles({
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 toast.success("Role successfully added.");
//             }

//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to process role. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     {roles.map((role, index) => (
//                                         <li
//                                             key={index}
//                                             className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                                                 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                         >
//                                             <span>{role.roleName}</span>
//                                             <span className='flex gap-5 items-center mr-2'>
//                                                 <i
//                                                     className="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300 cursor-pointer"
//                                                     onClick={() => handleEditRole(role.id, index)}  // Pencil icon for edit
//                                                 ></i>
//                                                 <i className="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}  // Call handleRoleClick on click
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                             >
//                                                 <span>{role.roleName}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="add role/edit role"
//                                                 className={`border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 disabled={isSubmitting}
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole;




// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles, FetchEmployeeRoles } from "../../../../../model/employeeDash"
// import { ref, update, get } from 'firebase/database';
// import { database } from "../../../../../model/firebaseConfig";// Import Firebase update method

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");
//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [currentRoleId, setCurrentRoleId] = useState(null);

//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const rolesData = await FetchEmployeeRoles();
//                 const rolesArray = Object.keys(rolesData).map(roleId => ({
//                     id: roleId,
//                     ...rolesData[roleId]
//                 }));
//                 setRoles(rolesArray);
//             } catch (error) {
//                 safeToastError("Failed to fetch roles.");
//             }
//         };

//         fetchRoles();
//     }, []);

//     const safeToastError = (message) => {
//         if (message && typeof message === 'string') {
//             toast.error(message);
//         } else {
//             toast.error('Something went wrong.');
//         }
//     };

//     const safeToastSuccess = (message) => {
//         if (message && typeof message === 'string') {
//             toast.success(message);
//         } else {
//             toast.success('Action completed successfully.');
//         }
//     };

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     const handleAddNewRole = () => {
//         setRoles([...roles, { roleName: "New Role", permissions: {} }]);
//         setEmployeeRoleName("New Role");
//         setCurrentRoleId(null);
//         setToggles(Array(permissions.length).fill(false));
//         setIsCreateRoleOpen(true);
//     };

//     const handleEditRole = async (roleId, index) => {
//         try {
//             const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
//             const snapshot = await get(roleRef);
//             if (snapshot.exists()) {
//                 const roleData = snapshot.val();
//                 setEmployeeRoleName(roleData.roleName);
//                 const fetchedPermissions = roleData.permissions;
//                 const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
//                 setToggles(newToggles);
//                 setCurrentRoleId(roleId);
//                 setActiveRoleIndex(index);
//                 setIsCreateRoleOpen(true);
//             } else {
//                 safeToastError("Role not found.");
//             }
//         } catch (error) {
//             safeToastError("Failed to fetch role.");
//         }
//     };

//     const handleRoleClick = async (index) => {
//         const selectedRole = roles[index];
//         handleEditRole(selectedRole.id, index);  // Call handleEditRole directly to fetch and show role data
//     };

//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex].roleName = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
//         "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
//         "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
//         "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
//         "View investors", "View investors list", "Manage investors", "Verify investors",
//         "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
//         "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
//         "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports"
//     ];

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!employeeRoleName || employeeRoleName.trim() === "") {
//             safeToastError("Please add a valid role name before submitting.");
//             return;
//         }

//         if (isSubmitting) {
//             return;
//         }

//         setIsSubmitting(true);

//         const rolePermissions = permissions.reduce((acc, permission, index) => {
//             acc[permission] = toggles[index];
//             return acc;
//         }, {});

//         try {
//             if (currentRoleId) {
//                 const roleRef = ref(database, `healthcare/employeeroles/${currentRoleId}`);
//                 await update(roleRef, {
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 safeToastSuccess("Role updated successfully.");
//             } else {
//                 const RoleID = await AddEmployeeRoles({
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 safeToastSuccess("Role successfully added.");
//             }

//             setEmployeeRoleName("");
//             setToggles(Array(permissions.length).fill(false));

//         } catch (error) {
//             safeToastError("Failed to process role. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     {roles.map((role, index) => (
//                                         <li
//                                             key={index}
//                                             className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                                                 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                         >
//                                             <span>{role.roleName}</span>
//                                             <span className='flex gap-5 items-center mr-2'>
//                                                 <i
//                                                     className="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300 cursor-pointer"
//                                                     onClick={() => handleEditRole(role.id, index)}  // Pencil icon for edit
//                                                 ></i>
//                                                 <i className="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}  // Call handleRoleClick on click
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                             >
//                                                 <span>{role.roleName}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="add role/edit role"
//                                                 className={`border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 disabled={isSubmitting}
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole;


// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles, FetchEmployeeRoles, DeleteEmployeeRole } from "../../../../../model/employeeDash" // Import DeleteEmployeeRole
// import { ref, update, get } from 'firebase/database';
// import { database } from "../../../../../model/firebaseConfig"; // Import Firebase

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");
//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [currentRoleId, setCurrentRoleId] = useState(null);

//     // Fetch roles from the database
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const rolesData = await FetchEmployeeRoles();
//                 const rolesArray = Object.keys(rolesData).map(roleId => ({
//                     id: roleId,
//                     ...rolesData[roleId]
//                 }));
//                 setRoles(rolesArray);
//             } catch (error) {
//                 safeToastError("Failed to fetch roles.");
//             }
//         };

//         fetchRoles();
//     }, []);

//     const safeToastError = (message) => {
//         if (message && typeof message === 'string') {
//             toast.error(message);
//         } else {
//             toast.error('Something went wrong.');
//         }
//     };

//     // Safely show a success toast
//     const safeToastSuccess = (message) => {
//         if (message && typeof message === 'string') {
//             toast.success(message);
//         } else {
//             toast.success('Action completed successfully.');
//         }
//     };

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     // Add a new role
//     const handleAddNewRole = async () => {
//         const newRole = { roleName: "New Role", permissions: {} };
//         try {
//             const RoleID = await AddEmployeeRoles(newRole); // Add the role to the database
//             newRole.id = RoleID; // Add the ID to the new role
//             setRoles([...roles, newRole]); // Add the new role to the state
//             setEmployeeRoleName("New Role");
//             setCurrentRoleId(RoleID); // Set current role ID
//             setToggles(Array(permissions.length).fill(false)); // Reset permissions toggles to false
//             setIsCreateRoleOpen(true); // Open the role creation panel
//             setActiveRoleIndex(roles.length); // Set the newly added role as active
//         } catch (error) {
//             safeToastError("Failed to add new role.");
//         }
//     };

//     // Edit role and fetch data from the database
//     const handleEditRole = async (roleId, index) => {
//         try {
//             const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
//             const snapshot = await get(roleRef);
//             if (snapshot.exists()) {
//                 const roleData = snapshot.val();
//                 setEmployeeRoleName(roleData.roleName);
//                 const fetchedPermissions = roleData.permissions;
//                 const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
//                 setToggles(newToggles);
//                 setCurrentRoleId(roleId); // Set the current role ID for updates
//                 setActiveRoleIndex(index);
//                 setIsCreateRoleOpen(true); // Open the role editing panel
//             } else {
//                 safeToastError("Role not found.");
//             }
//         } catch (error) {
//             safeToastError("Failed to fetch role.");
//         }
//     };

//     // Handle role click to fetch and activate
//     const handleRoleClick = async (index) => {
//         const selectedRole = roles[index];
//         handleEditRole(selectedRole.id, index);  // Call handleEditRole to fetch and display data
//     };

//     const handleInputChange = (e) => {
//         const updatedRoleName = e.target.value;
//         setEmployeeRoleName(updatedRoleName);

//         if (activeRoleIndex !== null) {
//             const updatedRoles = [...roles];
//             updatedRoles[activeRoleIndex].roleName = updatedRoleName || "Untitled Role";
//             setRoles(updatedRoles);
//         }
//     };

//     const permissions = [
//         "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
//         "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
//         "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
//         "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
//         "View investors", "View investors list", "Manage investors", "Verify investors",
//         "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
//         "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
//         "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports"
//     ];

//     const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

//     const handleToggle = (index) => {
//         const newToggles = [...toggles];
//         newToggles[index] = !newToggles[index];
//         setToggles(newToggles);
//     };

//     // Handle submitting a new role or updating an existing one
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!employeeRoleName || employeeRoleName.trim() === "") {
//             safeToastError("Please add a valid role name before submitting.");
//             return;
//         }

//         if (isSubmitting) {
//             return;
//         }

//         setIsSubmitting(true);

//         const rolePermissions = permissions.reduce((acc, permission, index) => {
//             acc[permission] = toggles[index]; // Map the permissions to their toggle values
//             return acc;
//         }, {});

//         try {
//             if (currentRoleId) {
//                 // Update role
//                 const roleRef = ref(database, `healthcare/employeeroles/${currentRoleId}`);
//                 await update(roleRef, {
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 safeToastSuccess("Role updated successfully.");
//             } else {
//                 // Add new role
//                 const RoleID = await AddEmployeeRoles({
//                     roleName: employeeRoleName,
//                     permissions: rolePermissions
//                 });
//                 safeToastSuccess("Role successfully added.");
//             }

//             // setEmployeeRoleName(""); // Reset the role name input
//             // setToggles(Array(permissions.length).fill(false)); // Reset permissions toggles

//         } catch (error) {
//             safeToastError("Failed to process role. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Handle deleting a role from the database
//     const handleDeleteRole = async (roleId) => {
//         try {
//             await DeleteEmployeeRole(roleId); // Delete role using the delete function
//             setRoles(roles.filter((role) => role.id !== roleId)); // Update the roles state
//             safeToastSuccess("Role deleted successfully.");
//         } catch (error) {
//             safeToastError("Failed to delete role.");
//         }
//     };

//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
//                 <span className='text-3xl font-bold text-slate-600'>Employees Roles</span>
//                 <span className='text-base font-medium text-slate-500'>This page is used to control the roles of all existing employees in the company.</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <div className="all-role">
//                     <div className="flex w-full flex-col gap-5 mt-10">
//                         <div className="flex w-full flex-row gap-5">
//                             <div className="relative input w-[65%] md:w-[75%] flex items-center">
//                                 <input
//                                     type="text"
//                                     name="employeeRole"
//                                     id="employeeRole"
//                                     value={employeeRole}
//                                     placeholder='Search employee role'
//                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
//                                 />
//                             </div>
//                             <div className="flex-1 flex">
//                                 <button
//                                     onClick={handleCreateNewRoles}
//                                     className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
//                                 >
//                                     Create new role
//                                 </button>
//                             </div>
//                         </div>
//                         <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
//                             <div className="">
//                                 <ul className='flex flex-col gap-2'>
//                                     {roles.map((role, index) => (
//                                         <li
//                                             key={index}
//                                             className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                                                 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                         >
//                                             <span>{role.roleName}</span>
//                                             <span className='flex gap-5 items-center mr-2'>
//                                                 <i
//                                                     className="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300 cursor-pointer"
//                                                     onClick={() => handleEditRole(role.id, index)}  // Pencil icon for edit
//                                                 ></i>
//                                                 <i
//                                                     className="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300 cursor-pointer"
//                                                     onClick={() => handleDeleteRole(role.id)}  // Trash icon for delete
//                                                 ></i>
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
//                         <div className="flex flex-col md:flex-row gap-5">
//                             <div className="create-role-sidebar h-full w-full md:w-80">
//                                 <div className="top flex justify-between mb-2">
//                                     <span
//                                         onClick={handleBackButtonClicked}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-left-long text-2xl "></i> Back
//                                     </span>
//                                     <span
//                                         onClick={handleAddNewRole}
//                                         className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
//                                         <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
//                                     </span>
//                                 </div>
//                                 <div className="new-role-list">
//                                     <ul className='flex flex-col gap-2'>
//                                         {roles.map((role, index) => (
//                                             <li
//                                                 key={index}
//                                                 onClick={() => handleRoleClick(index)}  // Call handleRoleClick on click
//                                                 className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
//                                                 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
//                                             >
//                                                 <span>{role.roleName}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="create-new-role w-full block md:flex-1">
//                                 <div className=" mb-2">
//                                     <span className='font-semibold flex items-center text-xl mb-2'>
//                                         Edit Role / New Role
//                                     </span>
//                                 </div>
//                                 <div className="form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="permissions">
//                                             <div className="relative input w-full md:w-[75%] flex items-center mt-3">
//                                                 <input
//                                                     type="text"
//                                                     name="employeeRoleName"
//                                                     id="employeeRoleName"
//                                                     value={employeeRoleName}
//                                                     onChange={handleInputChange}
//                                                     placeholder='Enter role name'
//                                                     className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
//                                                 />
//                                             </div>
//                                             <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
//                                                 {permissions.map((permission, index) => (
//                                                     <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
//                                                         <span className="flex-1 font-medium pl-5">
//                                                             {permission}
//                                                         </span>
//                                                         <span className="w-16 flex">
//                                                             <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="sr-only"
//                                                                     checked={toggles[index]}
//                                                                     onChange={() => handleToggle(index)}
//                                                                 />
//                                                                 <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
//                                                                     {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
//                                                                 </span>
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
//                                             <input
//                                                 type="submit"
//                                                 value="Save changes"
//                                                 className={`border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 disabled={isSubmitting}
//                                             />
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default EMPRole;


// Update the component to implement search functionality

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { AddEmployeeRoles, FetchEmployeeRoles, DeleteEmployeeRole } from "../../../../../model/employeeDash"
import { ref, update, get } from 'firebase/database';
import { database } from "../../../../../model/firebaseConfig";// Import Firebase update method

const EMPRole = () => {
    const [employeeRole, setEmployeeRole] = useState(""); // This is your search term
    const [employeeRoleName, setEmployeeRoleName] = useState("");
    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    const [, setIsBackButtonClicked] = useState(false);
    const [roles, setRoles] = useState([]);
    const [activeRoleIndex, setActiveRoleIndex] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentRoleId, setCurrentRoleId] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await FetchEmployeeRoles();
                const rolesArray = Object.keys(rolesData).map(roleId => ({
                    id: roleId,
                    ...rolesData[roleId]
                }));
                setRoles(rolesArray);
            } catch (error) {
                safeToastError("Failed to fetch roles.");
            }
        };

        fetchRoles();
    }, []);

    const safeToastError = (message) => {
        if (message && typeof message === 'string') {
            toast.error(message);
        } else {
            toast.error('Something went wrong.');
        }
    };

    const safeToastSuccess = (message) => {
        if (message && typeof message === 'string') {
            toast.success(message);
        } else {
            toast.success('Action completed successfully.');
        }
    };

    const handleBackButtonClicked = () => {
        setIsBackButtonClicked(true);
        setIsCreateRoleOpen(false);
    };

    const handleCreateNewRoles = () => {
        setIsCreateRoleOpen(true);
    };

    const handleAddNewRole = () => {
        setRoles([...roles, { roleName: "New Role", permissions: {} }]);
        setEmployeeRoleName("New Role");
        setCurrentRoleId(null);
        setToggles(Array(permissions.length).fill(false));
        setIsCreateRoleOpen(true);
    };

    const handleEditRole = async (roleId, index) => {
        try {
            const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
            const snapshot = await get(roleRef);
            if (snapshot.exists()) {
                const roleData = snapshot.val();
                setEmployeeRoleName(roleData.roleName);
                const fetchedPermissions = roleData.permissions;
                const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
                setToggles(newToggles);
                setCurrentRoleId(roleId);
                setActiveRoleIndex(index);
                setIsCreateRoleOpen(true);
            } else {
                safeToastError("Role not found.");
            }
        } catch (error) {
            safeToastError("Failed to fetch role.");
        }
    };
    const handleDeleteRole = async (roleId) => {
        try {
            await DeleteEmployeeRole(roleId); // Delete role using the delete function
            setRoles(roles.filter((role) => role.id !== roleId)); // Update the roles state
            safeToastSuccess("Role deleted successfully.");
        } catch (error) {
            safeToastError("Failed to delete role.");
        }
    };

    const handleRoleClick = async (index) => {
        const selectedRole = roles[index];
        handleEditRole(selectedRole.id, index);  // Call handleEditRole directly to fetch and show role data
    };

    const handleInputChange = (e) => {
        const updatedRoleName = e.target.value;
        setEmployeeRoleName(updatedRoleName);

        if (activeRoleIndex !== null) {
            const updatedRoles = [...roles];
            updatedRoles[activeRoleIndex].roleName = updatedRoleName || "Untitled Role";
            setRoles(updatedRoles);
        }
    };

    const permissions = [
        "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
        "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
        "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
        "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
        "View investors", "View investors list", "Manage investors", "Verify investors",
        "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
        "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
        "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports"
    ];

    const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

    const handleToggle = (index) => {
        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];
        setToggles(newToggles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeRoleName || employeeRoleName.trim() === "") {
            safeToastError("Please add a valid role name before submitting.");
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const rolePermissions = permissions.reduce((acc, permission, index) => {
            acc[permission] = toggles[index];
            return acc;
        }, {});

        try {
            if (currentRoleId) {
                const roleRef = ref(database, `healthcare/employeeroles/${currentRoleId}`);
                await update(roleRef, {
                    roleName: employeeRoleName,
                    permissions: rolePermissions
                });
                safeToastSuccess("Role updated successfully.");
            } else {
                const RoleID = await AddEmployeeRoles({
                    roleName: employeeRoleName,
                    permissions: rolePermissions
                });
                safeToastSuccess("Role successfully added.");
            }

            // setEmployeeRoleName("");
            // setToggles(Array(permissions.length).fill(false));

        } catch (error) {
            safeToastError("Failed to process role. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Filter the roles based on the search term
    const filteredRoles = roles.filter(role => role.roleName.toLowerCase().includes(employeeRole.toLowerCase()));

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
                                    value={employeeRole} // Controlled search input
                                    onChange={(e) => setEmployeeRole(e.target.value)} // Update search term on input change
                                    placeholder='Search employee role'
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
                                />
                            </div>
                            <div className="flex-1 flex">
                                <button
                                    onClick={handleCreateNewRoles}
                                    className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
                                >
                                    Create new role
                                </button>
                            </div>
                        </div>
                        <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
                            <div className="">
                                <ul className='flex flex-col gap-2'>
                                    {filteredRoles.map((role, index) => (  // Use filtered roles for display
                                        <li
                                            key={index}
                                            className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
                                                ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                        >
                                            <span>{role.roleName}</span>
                                            <span className='flex gap-5 items-center mr-2'>
                                                <i
                                                    className="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300 cursor-pointer"
                                                    onClick={() => handleEditRole(role.id, index)}  // Pencil icon for edit
                                                ></i>
                                                <i className="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"
                                                    onClick={() => handleDeleteRole(role.id)}
                                                ></i>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`create-role bg-white w-full h-full mt-5 z-10 p-5 ${isCreateRoleOpen ? "block" : "hidden"}`}>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="create-role-sidebar h-full w-full md:w-80">
                                <div className="top flex justify-between mb-2">
                                    <span
                                        onClick={handleBackButtonClicked}
                                        className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
                                        <i class="fa-solid fa-left-long text-2xl "></i> Back
                                    </span>
                                    <span
                                        onClick={handleAddNewRole}
                                        className='flex items-center gap-2 font-semibold text-slate-500 duration-300 cursor-pointer border-2 px-5 border-slate-600 rounded-full hover:bg-slate-600 hover:text-white'>
                                        <i class="fa-solid fa-plus text-2xl font-extrabold"></i> Add
                                    </span>
                                </div>
                                <div className="new-role-list">
                                    <ul className='flex flex-col gap-2'>
                                        {roles.map((role, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleRoleClick(index)}  // Call handleRoleClick on click
                                                className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
            ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                            >
                                                <span>{role.roleName}</span>
                                            </li>
                                        ))}
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="permissions">
                                            <div className="relative input w-full md:w-[75%] flex items-center mt-3">
                                                <input
                                                    type="text"
                                                    name="employeeRoleName"
                                                    id="employeeRoleName"
                                                    value={employeeRoleName}
                                                    onChange={handleInputChange}
                                                    placeholder='Enter role name'
                                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-2 px-5 font-medium outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                                />
                                            </div>
                                            <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
                                                {permissions.map((permission, index) => (
                                                    <div key={index} className="w-full flex p-2 cursor-pointer items-center border-2 border-slate-300 rounded-full flex-row">
                                                        <span className="flex-1 font-medium pl-5">
                                                            {permission}
                                                        </span>
                                                        <span className="w-16 flex">
                                                            <label className={`relative w-14 h-7 cursor-pointer rounded-full ${toggles[index] ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="sr-only"
                                                                    checked={toggles[index]}
                                                                    onChange={() => handleToggle(index)}
                                                                />
                                                                <span className={`w-6 h-6 bg-white rounded-full absolute top-0.5 flex items-center justify-center text-gray-400 transition-all duration-500 ${toggles[index] ? 'left-7' : 'left-1'}`}>
                                                                    {toggles[index] ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
                                                                </span>
                                                            </label>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
                                            <input
                                                type="submit"
                                                value="Save changes"
                                                className={`border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EMPRole;
