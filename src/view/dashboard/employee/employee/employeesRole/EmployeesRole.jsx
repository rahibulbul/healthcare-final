// import React, { useEffect, useRef, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { FaTimes, FaCheck } from 'react-icons/fa';
// import { AddEmployeeRoles, FetchEmployeeRoles, DeleteEmployeeRole } from "../../../../../model/employeeDash"
// import { ref, update, get } from 'firebase/database';
// import { database } from "../../../../../model/firebaseConfig";// Import Firebase update method

// const EMPRole = () => {
//     const [employeeRole, setEmployeeRole] = useState(""); // This is your search term
//     const [employeeRoleName, setEmployeeRoleName] = useState("");
//     const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
//     const [, setIsBackButtonClicked] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [activeRoleIndex, setActiveRoleIndex] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [currentRoleId, setCurrentRoleId] = useState(null);
//     const inputRef = useRef(null);

//     // useEffect(() => {
//     //     const fetchRoles = async () => {
//     //         try {
//     //             const rolesData = await FetchEmployeeRoles();
//     //             const rolesArray = Object.keys(rolesData).map(roleId => ({
//     //                 id: roleId,
//     //                 ...rolesData[roleId]
//     //             }));
//     //             setRoles(rolesArray);
//     //         } catch (error) {
//     //             safeToastError("Failed to fetch roles.");
//     //         }
//     //     };

//     //     fetchRoles();
//     // }, []);
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const rolesData = await FetchEmployeeRoles();

//                 // Ensure rolesData is not undefined or null
//                 if (rolesData && Object.keys(rolesData).length > 0) {
//                     const rolesArray = Object.keys(rolesData).map(roleId => ({
//                         id: roleId,
//                         ...rolesData[roleId]
//                     }));
//                     setRoles(rolesArray);
//                 } else {
//                     setRoles([]);  // In case no roles are found, set an empty array
//                     safeToastError("No roles found.");
//                 }
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

//     // const handleCreateNewRoles = () => {
//     //     const newRole = { roleName: "New Role", permissions: {} };
//     //     const updatedRoles = [...roles, newRole];
//     //     const newIndex = updatedRoles.length - 1;
//     //     setRoles(updatedRoles);
//     //     setEmployeeRoleName("New Role");
//     //     setCurrentRoleId(null);
//     //     setToggles(Array(permissions.length).fill(false));
//     //     setActiveRoleIndex(newIndex);
//     //     setIsCreateRoleOpen(true);

//     //     setTimeout(() => {
//     //         if (inputRef.current) {
//     //             inputRef.current.focus();
//     //         }
//     //     }, 100);
//     // };


//     const handleAddNewRole = () => {
//         setRoles([...roles, { roleName: "New Role", permissions: {} }]);
//         setEmployeeRoleName("New Role");
//         setCurrentRoleId(null);
//         setToggles(Array(permissions.length).fill(false));
//         setIsCreateRoleOpen(true);
//     };

//     // const handleEditRole = async (roleId, index) => {
//     //     try {
//     //         const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
//     //         const snapshot = await get(roleRef);
//     //         if (snapshot.exists()) {
//     //             const roleData = snapshot.val();
//     //             setEmployeeRoleName(roleData.roleName);
//     //             const fetchedPermissions = roleData.permissions;
//     //             const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
//     //             setToggles(newToggles);
//     //             setCurrentRoleId(roleId);
//     //             setActiveRoleIndex(index);
//     //             setIsCreateRoleOpen(true);
//     //         } else {
//     //             safeToastError("Role not found.");
//     //         }
//     //     } catch (error) {
//     //         safeToastError("Failed to fetch role.");
//     //     }
//     // };
//     const handleEditRole = async (roleId, index) => {
//         try {
//             const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
//             const snapshot = await get(roleRef);

//             // Check if the role data exists in the snapshot
//             if (snapshot.exists()) {
//                 const roleData = snapshot.val();
//                 setEmployeeRoleName(roleData.roleName || "");  // Handle missing roleName gracefully

//                 // Ensure fetchedPermissions is always an object to prevent undefined errors
//                 const fetchedPermissions = roleData.permissions || {};

//                 // Map the permissions to toggles
//                 const newToggles = permissions.map(permission => !!fetchedPermissions[permission]);  // Default to false if not present
//                 setToggles(newToggles);

//                 // Set current role ID, active index, and open the role editing panel
//                 setCurrentRoleId(roleId);
//                 setActiveRoleIndex(index);
//                 setIsCreateRoleOpen(true);
//             } else {
//                 // Role not found, display error
//                 safeToastError("Role not found.");
//             }
//         } catch (error) {
//             // Catch and display any errors encountered during the fetch operation
//             console.error("Error fetching role:", error);
//             safeToastError("Failed to fetch role.");
//         }
//     };





//     const handleDeleteRole = async (roleId) => {
//         try {
//             await DeleteEmployeeRole(roleId); // Delete role using the delete function
//             setRoles(roles.filter((role) => role.id !== roleId)); // Update the roles state
//             safeToastSuccess("Role deleted successfully.");
//         } catch (error) {
//             safeToastError("Failed to delete role.");
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

//     // const handleToggle = (index) => {
//     //     const newToggles = [...toggles];
//     //     newToggles[index] = !newToggles[index];
//     //     setToggles(newToggles);
//     // };
//     const handleToggle = (index) => {
//         console.log("Toggling permission at index:", index);
//         if (index >= 0 && index < toggles.length) {
//             const newToggles = [...toggles];
//             newToggles[index] = !newToggles[index];
//             setToggles(newToggles);
//         } else {
//             console.error("Invalid toggle index:", index);
//         }
//     };


//     const handleCreateNewRoles = async (e) => {
//         e.preventDefault();

//         const NewRoleName = "New Role";
//         const newRole = { roleName: NewRoleName, permissions: {} };  // Create a new role with default permissions
//         const updatedRoles = [...roles, newRole];  // Add to roles list
//         const newIndex = updatedRoles.length - 1;

//         setRoles(updatedRoles);  // Update roles with the new role
//         setEmployeeRoleName(NewRoleName);
//         setCurrentRoleId(null);  // Clear any current role ID as this is a new role
//         setToggles(Array(permissions.length).fill(false));  // Reset permissions
//         setActiveRoleIndex(newIndex);  // Set new role as active
//         setIsCreateRoleOpen(true);  // Open the role creation panel

//         if (isSubmitting) {
//             return;
//         }
//         setIsSubmitting(true);

//         const rolePermissions = permissions.reduce((acc, permission, index) => {
//             acc[permission] = toggles[index];  // Store the toggled permissions
//             return acc;
//         }, {});

//         try {
//             const RoleID = await AddEmployeeRoles({
//                 roleName: NewRoleName,
//                 permissions: rolePermissions
//             });

//             // After adding the role to the database, update the role in the state with the RoleID
//             const updatedRolesWithID = updatedRoles.map((role, index) => {
//                 if (index === newIndex) {
//                     return { ...role, id: RoleID };  // Add the RoleID to the newly created role
//                 }
//                 return role;
//             });

//             setRoles(updatedRolesWithID);  // Update the roles in the state with the RoleID
//             setTimeout(() => {
//                 if (inputRef.current) {
//                     inputRef.current.focus();  // Focus on the input after a short delay
//                 }
//             }, 100);
//             safeToastSuccess("Role successfully added.");

//         } catch (error) {
//             safeToastError("Failed to process role. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
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

//         } catch (error) {
//             safeToastError("Failed to process role. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Filter the roles based on the search term
//     const filteredRoles = roles.filter(role => role.roleName.toLowerCase().includes(employeeRole.toLowerCase()));

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
//                                     value={employeeRole} // Controlled search input
//                                     onChange={(e) => setEmployeeRole(e.target.value)} // Update search term on input change
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
//                                     {filteredRoles.map((role, index) => (  // Use filtered roles for display
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
//                                                 <i className="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"
//                                                     onClick={() => handleDeleteRole(role.id)}
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
//                                                     ref={inputRef}
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


import React, { useEffect, useRef, useState } from 'react'
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
    const inputRef = useRef(null);

    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const rolesData = await FetchEmployeeRoles();
    //             const rolesArray = Object.keys(rolesData).map(roleId => ({
    //                 id: roleId,
    //                 ...rolesData[roleId]
    //             }));
    //             setRoles(rolesArray);
    //         } catch (error) {
    //             safeToastError("Failed to fetch roles.");
    //         }
    //     };

    //     fetchRoles();
    // }, []);
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesArray = await FetchEmployeeRoles();  // Fetch sorted roles
                setRoles(rolesArray);  // Update roles in the state

                console.log("Fetched roles:", rolesArray);

                // Reset toggles for the fetched roles
                setToggles(Array(permissions.length).fill(false));  // Reset toggles to all false initially
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
            console.error('Invalid toast error message:', message);  // Log invalid message
            toast.error('Something went wrong.');
        }
    };

    const safeToastSuccess = (message) => {
        if (message && typeof message === 'string') {
            toast.success(message);
        } else {
            console.error('Invalid toast success message:', message);  // Log invalid message
            toast.success('Action completed successfully.');
        }
    };


    const handleBackButtonClicked = () => {
        setIsBackButtonClicked(true);
        setIsCreateRoleOpen(false);
    };

    // const handleCreateNewRoles = () => {
    //     const newRole = { roleName: "New Role", permissions: {} };
    //     const updatedRoles = [...roles, newRole];
    //     const newIndex = updatedRoles.length - 1;
    //     setRoles(updatedRoles);
    //     setEmployeeRoleName("New Role");
    //     setCurrentRoleId(null);
    //     setToggles(Array(permissions.length).fill(false));
    //     setActiveRoleIndex(newIndex);
    //     setIsCreateRoleOpen(true);

    //     setTimeout(() => {
    //         if (inputRef.current) {
    //             inputRef.current.focus();
    //         }
    //     }, 100);
    // };


    const handleAddNewRole = () => {
        setRoles([...roles, { roleName: "New Role", permissions: {} }]);
        setEmployeeRoleName("New Role");
        setCurrentRoleId(null);
        setToggles(Array(permissions.length).fill(false));
        setIsCreateRoleOpen(true);
    };

    // const handleEditRole = async (roleId, index) => {
    //     try {
    //         const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
    //         const snapshot = await get(roleRef);
    //         if (snapshot.exists()) {
    //             const roleData = snapshot.val();
    //             setEmployeeRoleName(roleData.roleName);
    //             const fetchedPermissions = roleData.permissions;
    //             const newToggles = permissions.map(permission => fetchedPermissions[permission] || false);
    //             setToggles(newToggles);
    //             setCurrentRoleId(roleId);
    //             setActiveRoleIndex(index);
    //             setIsCreateRoleOpen(true);
    //         } else {
    //             safeToastError("Role not found.");
    //         }
    //     } catch (error) {
    //         safeToastError("Failed to fetch role.");
    //     }
    // };
    const handleEditRole = async (roleId, index) => {
        try {
            const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
            const snapshot = await get(roleRef);

            if (snapshot.exists()) {
                const roleData = snapshot.val();
                console.log("Fetched role data:", roleData);

                setEmployeeRoleName(roleData.roleName || "Untitled Role");

                const fetchedPermissions = roleData.permissions || {};
                console.log("Fetched permissions:", fetchedPermissions);

                const newToggles = permissions.map(permission => !!fetchedPermissions[permission]);
                console.log("New toggles:", newToggles);

                setToggles(newToggles);  // Set toggles safely
                setCurrentRoleId(roleId);
                setActiveRoleIndex(index);
                setIsCreateRoleOpen(true);
            } else {
                toast.error("Role not found.");
            }
        } catch (error) {
            toast.error("Failed to fetch role.");
            console.error("Error fetching role:", error);
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

    // const handleToggle = (index) => {
    //     const newToggles = [...toggles];
    //     newToggles[index] = !newToggles[index];
    //     setToggles(newToggles);
    // };
    const handleToggle = (index) => {
        console.log("Current toggles:", toggles);
        console.log("Toggle index:", index);

        // Safeguard to ensure index is valid
        if (index >= 0 && index < toggles.length) {
            const updatedToggles = [...toggles];
            updatedToggles[index] = !updatedToggles[index];  // Toggle the value
            setToggles(updatedToggles);  // Update state safely
        } else {
            console.error(`Invalid toggle index: ${index}`);
        }
    };



    const handleCreateNewRoles = async (e) => {
        e.preventDefault();

        const NewRoleName = "New Role";

        // Initialize permissions object with all permissions set to false
        const newRolePermissions = permissions.reduce((acc, permission) => {
            acc[permission] = false;  // Initialize all permissions as false
            return acc;
        }, {});

        const newPosition = roles.length + 1;  // Add position as last item

        // Create a new role object with permissions and position
        const newRole = {
            roleName: NewRoleName,
            permissions: newRolePermissions,  // Set initialized permissions
            position: newPosition  // Set position for the new role
        };

        const updatedRoles = [...roles, newRole];  // Add new role to the roles list
        const newIndex = updatedRoles.length - 1;  // The index of the new role

        // Update local state to reflect the new role creation
        setRoles(updatedRoles);  // Update roles with the new role
        setEmployeeRoleName(NewRoleName);  // Set new role name
        setCurrentRoleId(null);  // Clear current role ID as this is a new role
        setToggles(Array(permissions.length).fill(false));  // Reset toggles to all false
        setActiveRoleIndex(newIndex);  // Set the new role as active
        setIsCreateRoleOpen(true);  // Open the role creation panel

        if (isSubmitting) {
            return;  // Prevent duplicate submissions
        }

        setIsSubmitting(true);  // Mark the form as submitting

        const rolePermissions = permissions.reduce((acc, permission, index) => {
            acc[permission] = toggles[index];  // Store the toggled permissions
            return acc;
        }, {});

        try {
            // Add the new role to the database with its permissions and position
            const RoleID = await AddEmployeeRoles({
                roleName: NewRoleName,
                permissions: rolePermissions,
                position: newPosition  // Add the role's position to Firebase
            });

            // Update the role with the RoleID after adding to the database
            const updatedRolesWithID = updatedRoles.map((role, index) => {
                if (index === newIndex) {
                    return { ...role, id: RoleID };  // Add the RoleID to the newly created role
                }
                return role;
            });

            setRoles(updatedRolesWithID);  // Update roles with the new RoleID

            // Focus on the input field after a short delay
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();  // Focus on the input after a short delay
                }
            }, 100);

            safeToastSuccess("Role successfully added.");  // Show success toast

        } catch (error) {
            safeToastError("Failed to process role. Please try again.");
            console.error("Error creating role:", error);
        } finally {
            setIsSubmitting(false);  // Mark the form as no longer submitting
        }
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
                                                    ref={inputRef}
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

