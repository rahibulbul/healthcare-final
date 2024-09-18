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

// const handleToggle = (index) => {
//     const newToggles = [...toggles];
//     newToggles[index] = !newToggles[index];
//     setToggles(newToggles);
// };

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
// import { addNewRoleToDatabase, updateRoleInDatabase } from "../../../../../model/employeeDash"

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState("");
//     const [employeeRoleName, setEmployeeRoleName] = useState("");

//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);

//     const [roles, setRoles] = useState([]);
//     const [newRoleId, setNewRoleId] = useState(null); // Track new role ID from Firebase

//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);

//     const handleBackButtonClicked = () => {
//         setIsBackButtonClicked(true);
//         setIsCreateRoleOpen(false);
//     };

//     const handleCreateNewRoles = () => {
//         setIsCreateRoleOpen(true);
//     };

//     const handleAddNewRole = async () => {
//         if (employeeRoleName.trim() === "") {
//             toast.error("Role name cannot be empty!");
//             return;
//         }

//         // Add new role with default permissions to Firebase
//         try {
//             const roleId = await addNewRoleToDatabase(employeeRoleName);
//             setNewRoleId(roleId);
//             setRoles([...roles, employeeRoleName]);
//             setActiveRoleIndex(roles.length);
//             setEmployeeRoleName("New Role");
//             toast.success("Role added successfully with default permissions!");
//         } catch (error) {
//             toast.error("Error adding role: " + error.message);
//         }
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

// const handleToggle = (index) => {
//     const newToggles = [...toggles];
//     newToggles[index] = !newToggles[index];
//     setToggles(newToggles);
// };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newRoleId === null) {
//             toast.error("Please add a role first!");
//             return;
//         }

//         // Prepare the permissions object based on the toggles
//         const updatedPermissions = permissions.reduce((acc, permission, index) => {
//             acc[permission] = toggles[index];
//             return acc;
//         }, {});

//         // Update role permissions in Firebase
//         try {
//             await updateRoleInDatabase(newRoleId, updatedPermissions);
//             toast.success("Role permissions updated successfully!");
//         } catch (error) {
//             toast.error("Error updating permissions: " + error.message);
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
//                             ${activeRoleIndex === index ? "bg-slate-200" : ""}`}  // Highlight active role
//                                         >
//                                             <span>{role}</span>
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
//                                                 value="Submit"
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

// export default EMPRole;


import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { AddEmployeeRoles, updateRoleInDatabase, fetchEmployeeRoles, } from "../../../../../model/employeeDash"

const EMPRole = () => {
    const [employeeRole, setEmployeeRole] = useState("");
    const [employeeRoleName, setEmployeeRoleName] = useState("");  // Track role name input

    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    const [, setIsBackButtonClicked] = useState(false);

    const [roles, setRoles] = useState([]);
    const [newRoleId, setNewRoleId] = useState(null); // Track new role ID from Firebase

    const [activeRoleIndex, setActiveRoleIndex] = useState(null);

    const handleBackButtonClicked = () => {
        setIsBackButtonClicked(true);
        setIsCreateRoleOpen(false);
    };

    const handleCreateNewRoles = () => {
        setIsCreateRoleOpen(true);
    };


    const handleAddNewRole = async (e) => {
        e.preventDefault();
        const defaultRoleName = "New Role";
        try {
            const roleData = {
                roleName: defaultRoleName,
                employee: {
                    view: false,
                    view_list: false,
                    manage: false,
                    manage_roles: false,
                    verify: false,
                },
                user: {
                    view: false,
                    view_list: false,
                    manage: false,
                    manage_roles: false,
                    verify: false,
                },
                insurance: {
                    view: false,
                    view_list: false,
                    manage: false,
                    manage_category: false,
                    verify: false,
                },
                appointments: {
                    view: false,
                    view_list: false,
                    manage: false,
                    verify: false,
                },
                investors: {
                    view: false,
                    view_list: false,
                    manage: false,
                    verify: false,
                },
                bills_and_expense: {
                    view: false,
                    view_bills_list: false,
                    view_expense_list: false,
                    manage_bills: false,
                    verify_bills: false,
                },
                reports: {
                    view: false,
                    view_users: false,
                    view_employees: false,
                    view_insurance: false,
                    view_company: false,
                    view_appointments: false,
                    view_investors: false,
                    view_bills_and_expense: false,
                    view_employee_salary: false,
                }
            };

            // Add the new role to the database
            const RoleID = await AddEmployeeRoles(roleData);
            toast.success("Role successfully registered.");

            // Update the roles state with the new role object
            setRoles([...roles, { id: RoleID, roleName: defaultRoleName, permissions: roleData }]);
            setActiveRoleIndex(roles.length);
            setEmployeeRoleName(defaultRoleName);
        } catch (error) {
            console.log(error.message);
            toast.error("Role adding failed. Please try again.");
        }
    };


    const handleRoleClick = (index) => {
        setActiveRoleIndex(index);
        setEmployeeRoleName(roles[index].roleName);
    };


    const handleInputChange = (e) => {
        const updatedRoleName = e.target.value;
        setEmployeeRoleName(updatedRoleName);

        if (activeRoleIndex !== null) {
            const updatedRoles = [...roles];
            updatedRoles[activeRoleIndex].roleName = updatedRoleName || "New Role";
            setRoles(updatedRoles);
        }
    };


    const permissions = [
        "View employee",
        'View employee list',
        'Manage employees',
        'Manage employee roles',
        'Verify employee',
        "View user",
        'View user list',
        'Manage users',
        'Manage user roles',
        'Verify users',
        "View insurance",
        'View insurance list',
        "Manage insurance",
        "Manage insurance category",
        'Verify insurance',
        "View appointments",
        "View appointments list",
        "Manage appointments",
        "Verify appointments",
        "View investors",
        "View investors list",
        "Manage investors",
        "Verify investors",
        "View bills and expense",
        "View bills list",
        "View expense list",
        "Manage bills",
        "Verify bills",
        "View reports",
        "View users reports",
        "View employees reports",
        "View insurance reports",
        "View company reports",
        "View appointments reports",
        "View investors reports",
        "View bills and expense reports",
        "View employee salary reports",
    ];

    const [toggles, setToggles] = useState(Array(permissions.length).fill(false));

    const handleToggle = (index) => {
        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];
        setToggles(newToggles);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPermissions = permissions.reduce((acc, permission, index) => {
            acc[permission] = toggles[index];
            return acc;
        }, {});

        // Get the current role's data to compare
        const currentRole = roles[activeRoleIndex];

        // Prepare the updated role data, but only include changes
        const updatedRoleData = {};

        // Check if the role name has changed
        if (currentRole.roleName !== employeeRoleName) {
            updatedRoleData.roleName = employeeRoleName;  // Only update if name is changed
        }

        // Check if the permissions have changed
        if (JSON.stringify(currentRole.permissions) !== JSON.stringify(updatedPermissions)) {
            updatedRoleData.permissions = updatedPermissions;  // Only update if permissions are changed
        }

        // If nothing has changed, show a message and return
        if (Object.keys(updatedRoleData).length === 0) {
            toast.info("No changes detected");
            return;
        }

        try {
            // Use the existing role ID to update the role in the database
            const roleId = currentRole.id;  // Use the existing role's ID
            await updateRoleInDatabase(roleId, updatedRoleData);  // Update the role
            toast.success("Role updated successfully!");

            // Update the local roles state with the updated role
            const updatedRoles = [...roles];
            updatedRoles[activeRoleIndex] = { ...currentRole, ...updatedRoleData };  // Merge changes
            setRoles(updatedRoles);

        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Error updating role: " + error.message);
        }
    };


    useEffect(() => {
        fetchEmployeeRoles(setRoles);  // Call the separate function to fetch roles
    }, []);

    // const handleRoleClick = (index) => {
    //     setActiveRoleIndex(index);
    // };

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
                                {roles.length > 0 ? (
                                    <ul className='flex flex-col gap-2'>
                                        {roles.map((role, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleRoleClick(index)}
                                                className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
            ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                            >
                                                <span>{role.roleName}</span>  {/* Render roleName property */}
                                                <span className='flex gap-5 items-center mr-2'>
                                                    <i class="fa-solid fa-pencil border-2 rounded-full border-slate-600 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                                    <i class="fa-solid fa-trash border-2 rounded-full border-slate-600 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                ) : (
                                    <li className="p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300">No roles found</li>
                                )}
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
                                                onClick={() => handleRoleClick(index)}
                                                className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
                            ${activeRoleIndex === index ? "bg-slate-200" : ""}`}  // Highlight active role
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
                                                value="Submit"
                                                className='border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white'
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
