import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { AddEmployeeRoles, FetchEmployeeRoles, FetchEmployeeRoleById, DeleteEmployeeRole, UpdateEmployeeRole } from "../../../../../model/employeeDash"

const EMPRole = () => {
    const [employeeRoleSearch, setEmployeeRoleSearch] = useState("");
    const [employeeRoleName, setEmployeeRoleName] = useState("");

    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    const [, setIsBackButtonClicked] = useState(false);

    const [isAddButtonClick, setIsAddButtonClick] = useState(false);

    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState("");
    const [permissions, setPermissions] = useState({});

    const [activeRoleIndex, setActiveRoleIndex] = useState(null);

    // const handleBackButtonClicked = () => {
    //     setIsBackButtonClicked(true);
    //     setIsCreateRoleOpen(false);
    // };
    const handleBackButtonClicked = () => {
        setIsBackButtonClicked(true);
        setIsCreateRoleOpen(false);  // Close the role editor

        // Optionally, reset any state that might cause issues
        setActiveRoleIndex(null);  // Reset active role index
        setEmployeeRoleName("");   // Clear role name input
        setPermissions({});        // Clear permissions
        setToggles(Array(allpermissions.length).fill(false));
        console.log("Active role index during save:", activeRoleIndex);
    };

    // const handleRoleClick = async (index) => {
    //     try {
    //         console.log("Clicked role index:", index);
    //         setActiveRoleIndex(index);
    //         setEmployeeRoleName(roles[index]?.roleName || "Untitled Role");

    //         const roleData = await FetchEmployeeRoleById(roles[index]?.id);
    //         if (!roleData) throw new Error("Role data not found");

    //         const fetchedPermissions = roleData.permissions || {};
    //         setPermissions(fetchedPermissions);

    //         const updatedToggles = allpermissions.map(permission => fetchedPermissions[permission] || false);
    //         setToggles(updatedToggles);
    //     } catch (error) {
    //         console.error("Error in handleRoleClick:", error);
    //     }
    // };

    // const handleRoleClick = async (index) => {
    //     setActiveRoleIndex(index);
    //     setEmployeeRoleName(roles[index].roleName);

    //     try {
    //         const roleData = await FetchEmployeeRoleById(roles[index].id);
    //         const fetchedPermissions = roleData.permissions || {};

    //         // Initialize toggles based on fetched permissions
    //         const updatedToggles = allpermissions.map(permission => fetchedPermissions[permission] || false);
    //         setToggles(updatedToggles);

    //         setPermissions(fetchedPermissions);
    //     } catch (error) {
    //         console.error("Error fetching role data:", error);
    //     }
    // };

    const handleRoleClick = async (index) => {
        const selectedRole = roles[index];
        console.log('Selected role:', selectedRole);  // Debugging: log the selected role

        if (!selectedRole || !selectedRole.id) {
            console.error("Role ID is missing");
            return;
        }

        setActiveRoleIndex(index);
        setEmployeeRoleName(selectedRole.roleName);

        try {
            const roleData = await FetchEmployeeRoleById(selectedRole.id);
            const fetchedPermissions = roleData.permissions || {};
            const updatedToggles = allpermissions.map(permission => fetchedPermissions[permission] || false);
            setToggles(updatedToggles);
            setPermissions(fetchedPermissions);
        } catch (error) {
            console.error("Error fetching role data:", error);
        }
    };

    // const handleInputChange = (e) => {
    //     const updatedRoleName = e.target.value;
    //     setEmployeeRoleName(updatedRoleName);
    //     if (activeRoleIndex !== null) {
    //         const updatedRoles = [...roles];
    //         updatedRoles[activeRoleIndex] = updatedRoleName || "Untitled Role";
    //         setRoles(updatedRoles);
    //     }
    // };

    // const handleInputChange = (e) => {
    //     const updatedRoleName = e.target.value;
    //     setEmployeeRoleName(updatedRoleName);

    //     if (activeRoleIndex !== null) {
    //         const updatedRoles = [...roles];
    //         updatedRoles[activeRoleIndex] = {
    //             ...updatedRoles[activeRoleIndex],  // Preserve other properties like `id`
    //             roleName: updatedRoleName || "Untitled Role",  // Only update the roleName
    //         };
    //         setRoles(updatedRoles);
    //     }
    // };

    // const handleInputChange = (e) => {
    //     setEmployeeRoleName(e.target.value);
    // };

    const handleInputChange = (e) => {
        const updatedRoleName = e.target.value;
        setEmployeeRoleName(updatedRoleName);
        if (activeRoleIndex !== null) {
            const updatedRoles = [...roles];
            updatedRoles[activeRoleIndex] = {
                ...updatedRoles[activeRoleIndex],
                roleName: updatedRoleName || "Untitled Role",
            };
            setRoles(updatedRoles);
        }
    };

    const handleSearchChange = (e) => {
        setEmployeeRoleSearch(e.target.value);
    };



    const allpermissions = [
        "Display on role list",
        "View employee", 'View employee list', 'Manage employees', 'Manage employee roles', 'Verify employee',
        "View user", 'View user list', 'Manage users', 'Manage user roles', 'Verify users',
        "View insurance", 'View insurance list', "Manage insurance", "Manage insurance category", 'Verify insurance',
        "View appointments", "View appointments list", "Manage appointments", "Verify appointments",
        "View investors", "View investors list", "Manage investors", "Verify investors",
        "View bills and expense", "View bills list", "View expense list", "Create bills", "Verify bills",
        "View reports", "View users reports", "View employees reports", "View insurance reports", "View company reports",
        "View appointments reports", "View investors reports", "View bills and expense reports", "View employee salary reports",
    ];

    const [toggles, setToggles] = useState(Array(allpermissions.length).fill(false));

    // const handleToggle = (index) => {
    //     const newToggles = [...toggles];
    //     newToggles[index] = !newToggles[index];
    //     setToggles(newToggles);
    // };

    // const handleToggle = (index) => {
    //     if (index >= toggles.length || toggles[index] === undefined) {
    //         console.error("Toggle index out of bounds or undefined:", index);
    //         return;
    //     }
    //     const newToggles = [...toggles];
    //     newToggles[index] = !newToggles[index];
    //     setToggles(newToggles);
    // };

    const handleToggle = (index) => {
        // Check if the index is within bounds and toggles are properly initialized
        if (index >= toggles.length || toggles[index] === undefined) {
            console.error("Toggle index out of bounds or undefined:", index);
            return;
        }

        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];  // Toggle the value
        setToggles(newToggles);
    };


    const handleAddNewRole = async (e) => {
        e.preventDefault();

        const NewRoleName = "New Role";
        const newRolePermissions = allpermissions.reduce((acc, allpermissions) => {
            acc[allpermissions] = false;  // All permissions start as false
            return acc;
        }, {});
        const newPosition = roles.length + 1;
        const timestamp = Date.now();
        const newRole = {
            roleName: NewRoleName,
            permissions: newRolePermissions,
            position: newPosition,
            lastupdate: timestamp
        };

        try {
            const newRoleID = await AddEmployeeRoles(newRole);
            setRoles(prevRoles => [...prevRoles, { id: newRoleID, roleName: NewRoleName, permissions: newRolePermissions, position: newPosition }]);
            setActiveRoleIndex(roles.length);
            setEmployeeRoleName(NewRoleName);
            setPermissions(newRolePermissions);
            setToggles(Array(allpermissions.length).fill(false));
            console.log(`New role created with ID: ${newRoleID}`);
            toast.success(`${NewRoleName} has been created successfully.`)
        } catch (error) {
            console.error("Failed to create a new role:", error);
            toast.error(`There is a problem while creating ${NewRoleName}`)
        }
    };

    const handleCreateNewRole = async (e) => {
        e.preventDefault();
        setIsCreateRoleOpen(true);
        const NewRoleName = "New Role";
        const newRolePermissions = allpermissions.reduce((acc, allpermissions) => {
            acc[allpermissions] = false;
            return acc;
        }, {});
        const newPosition = roles.length + 1;
        const timestamp = Date.now();
        const newRole = {
            roleName: NewRoleName,
            permissions: newRolePermissions,
            position: newPosition,
            lastupdate: timestamp
        };

        try {
            const newRoleID = await AddEmployeeRoles(newRole);
            setRoles(prevRoles => [...prevRoles, { id: newRoleID, roleName: NewRoleName, permissions: newRolePermissions, position: newPosition }]);
            setActiveRoleIndex(roles.length);
            setEmployeeRoleName(NewRoleName);
            setPermissions(newRolePermissions);
            setToggles(Array(allpermissions.length).fill(false));
            setIsCreateRoleOpen(true);
            toast.success(`${NewRoleName} has been created successfully.`);
        } catch (error) {
            console.error("Failed to create a new role:", error);
            toast.error(`There is a problem while creating ${NewRoleName}`)
        }
    };
    useEffect(() => {
        const loadRoles = async () => {
            try {
                const fetchedRoles = await FetchEmployeeRoles();
                setRoles(fetchedRoles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        loadRoles();
    }, []);

    const handleEditRole = async (roleId, index) => {
        try {
            const roleData = await FetchEmployeeRoleById(roleId);
            setActiveRoleIndex(index);
            setEmployeeRoleName(roleData.roleName);
            setPermissions(roleData.permissions);
            setIsCreateRoleOpen(true);
        } catch (error) {
            toast.error("Error")
            console.error("Error fetching role data:", error);
        }
    };

    const handleDeleteRole = async (roleId, index) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            try {
                await DeleteEmployeeRole(roleId);
                const updatedRoles = roles.filter((_, i) => i !== index);
                setRoles(updatedRoles);
                setActiveRoleIndex(null);

                toast.success("Role deleted successfully");
            } catch (error) {
                console.error("Error deleting role:", error);
                toast.error("Failed to delete role");
            }
        }
    };
    // const handleSaveChanges = async () => {
    //     const updatedRolePermissions = {};
    //     allpermissions.forEach((permission, index) => {
    //         updatedRolePermissions[permission] = toggles[index];
    //     });

    //     const updatedRole = {
    //         roleName: employeeRoleName,
    //         permissions: updatedRolePermissions,
    //         lastupdate: Date.now()
    //     };
    //     try {
    //         const roleId = roles[activeRoleIndex].id;
    //         await UpdateEmployeeRole(roleId, updatedRole);
    //         toast.success("Role updated successfully!");
    //     } catch (error) {
    //         console.error("Error updating role:", error);
    //         toast.error("Failed to update role.");
    //     }
    // };
    useEffect(() => {
        const loadRoles = async () => {
            try {
                const fetchedRoles = await FetchEmployeeRoles();
                console.log("Fetched roles:", fetchedRoles);  // Debugging: log the fetched roles
                setRoles(fetchedRoles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        loadRoles();
    }, []);


    // const handleSaveChanges = async () => {
    //     const updatedRolePermissions = {};
    //     allpermissions.forEach((permission, index) => {
    //         updatedRolePermissions[permission] = toggles[index];  // Map toggles to permissions
    //     });

    //     // Get the current position from the existing role
    //     const existingPosition = roles[activeRoleIndex]?.position;

    //     const updatedRole = {
    //         roleName: employeeRoleName,
    //         permissions: updatedRolePermissions,
    //         position: existingPosition,  // Keep the original position
    //         lastupdate: Date.now()  // Timestamp for the last update
    //     };

    //     try {
    //         const roleId = roles[activeRoleIndex]?.id;  // Get the current role's ID
    //         console.log("Role ID during save:", roleId);

    //         if (!roleId) {
    //             throw new Error("Role ID is undefined. Cannot update role.");
    //         }

    //         await UpdateEmployeeRole(roleId, updatedRole);  // Update the role in the database

    //         // Merge the updated role with the existing role, preserving the ID and position
    //         const updatedRoles = [...roles];
    //         updatedRoles[activeRoleIndex] = { ...updatedRoles[activeRoleIndex], ...updatedRole, id: roleId, position: existingPosition };  // Explicitly preserve the ID and position

    //         setRoles(updatedRoles);  // Update the local state
    //         toast.success("Role updated successfully!");  // Show success message
    //     } catch (error) {
    //         console.error("Error updating role:", error);
    //         toast.error("Failed to update role.");  // Show error message
    //     }
    // };

    // const handleSaveChanges = async () => {
    //     if (activeRoleIndex === null) {
    //         console.error("No active role selected.");
    //         return;
    //     }

    //     const updatedRolePermissions = {};
    //     allpermissions.forEach((permission, index) => {
    //         updatedRolePermissions[permission] = toggles[index];  // Map toggles to permissions
    //     });

    //     const roleId = roles[activeRoleIndex]?.id;  // Get the current role's ID
    //     console.log("Role ID during save:", roleId);  // Debugging: log the role ID

    //     if (!roleId) {
    //         console.error("Role ID is undefined. Cannot update role.");
    //         return;
    //     }

    //     // Ensure the original position is kept
    //     const existingPosition = roles[activeRoleIndex]?.position;

    //     // Prepare the updated role data, ensuring the position is maintained
    //     const updatedRole = {
    //         roleName: employeeRoleName,  // Updated name from the input field
    //         permissions: updatedRolePermissions,  // Updated permissions from toggles
    //         position: existingPosition,  // Keep the original position
    //         lastupdate: Date.now()  // Timestamp for the last update
    //     };

    //     try {
    //         await UpdateEmployeeRole(roleId, updatedRole);  // Update the role in the database

    //         // Update the roles array locally to reflect the updated role
    //         const updatedRoles = [...roles];
    //         updatedRoles[activeRoleIndex] = { ...updatedRoles[activeRoleIndex], ...updatedRole, id: roleId };  // Preserve the ID

    //         setRoles(updatedRoles);  // Update the local state
    //         console.log("Updated roles after save:", updatedRoles);
    //         toast.success("Role updated successfully!");  // Show success message
    //     } catch (error) {
    //         console.error("Error updating role:", error);
    //         toast.error("Failed to update role.");  // Show error message
    //     }
    // };

    const handleSaveChanges = async () => {
        if (activeRoleIndex === null) {
            console.error("No active role selected.");
            return;
        }

        const updatedRolePermissions = {};
        allpermissions.forEach((permission, index) => {
            updatedRolePermissions[permission] = toggles[index];  // Map toggles to permissions
        });

        const roleId = roles[activeRoleIndex]?.id;  // Get the current role's ID

        if (!roleId) {
            console.error("Role ID is undefined. Cannot update role.");
            return;
        }

        const existingPosition = roles[activeRoleIndex]?.position;

        // Prepare the updated role object with the updated role name and permissions
        const updatedRole = {
            roleName: employeeRoleName,  // Updated name from the input field
            permissions: updatedRolePermissions,  // Updated permissions from toggles
            position: existingPosition,  // Keep the original position
            lastupdate: Date.now()  // Timestamp for the last update
        };

        try {
            await UpdateEmployeeRole(roleId, updatedRole);  // Update the role in the database

            // After saving to the database, update the roles in local state
            const updatedRoles = [...roles];
            updatedRoles[activeRoleIndex] = { ...updatedRoles[activeRoleIndex], ...updatedRole, id: roleId };
            setRoles(updatedRoles);  // Update the local state
            toast.success("Role updated successfully!", {
                onClose: () => console.log("Toast closed!"),
            });
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role.");
        }
    };


    const filteredRoles = roles.filter(role => role.roleName.toLowerCase().includes(employeeRoleSearch.toLowerCase()));

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
                                    name="employeeRoleSearch"
                                    id="employeeRoleSearch"
                                    value={employeeRoleSearch}
                                    onChange={(e) => setEmployeeRoleSearch(e.target.value)}
                                    placeholder='Search employee role'
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500"
                                />
                            </div>
                            <div className="flex-1 flex">
                                <button
                                    onClick={handleCreateNewRole}
                                    className='relative w-full border-2 bg-white border-slate-700 rounded-2xl py-3 px-5 font-semibold outline-none hover:bg-slate-700 hover:shadow-ui-bold hover:text-white duration-500 peer'
                                >
                                    Create new role
                                </button>
                            </div>
                        </div>
                        <div className={`role-list w-full md:w-[50%] ${isCreateRoleOpen ? "hidden" : "block"}`} >
                            <div className="">
                                {filteredRoles.length === 0 ? (
                                    <li className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300`}>
                                        No roles found
                                    </li>
                                ) : (
                                    <ul className='flex flex-col gap-2'>
                                        {filteredRoles && filteredRoles.length > 0 && filteredRoles.map((role, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleRoleClick(index)}
                                                className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                            >
                                                <span className='flex gap-3 items-center'>
                                                    <span>{role.roleName || "Untitled Role"}</span>
                                                </span>
                                                <span className='flex gap-5 items-center mr-2'>
                                                    <i
                                                        onClick={() => handleEditRole(role.id, index)}
                                                        class="fa-solid fa-pencil border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                                    <i onClick={() => handleDeleteRole(role.id, index)}
                                                        class="fa-solid fa-trash border-2 rounded-full border-slate-400 p-2 text-[12px] hover:bg-slate-600 hover:text-white duration-300"></i>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
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
                                        {/* {roles.map((role, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleRoleClick(index)}
                                                className={`p-2 hover:bg-slate-300 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300
                            ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                            >
                                                <span>{role.roleName}</span>
                                            </li>
                                        ))} */}
                                        {roles && roles.length > 0 && roles.map((role, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleRoleClick(index)}
                                                className={`p-2 flex justify-between items-center hover:bg-slate-200 border-2 border-slate-300 font-semibold pl-5 rounded-full cursor-pointer duration-300 ${activeRoleIndex === index ? "bg-slate-200" : ""}`}
                                            >
                                                <span className='flex gap-3 items-center'>
                                                    <span>{role.roleName || "Untitled Role"}</span>  {/* Ensure roleName is defined */}
                                                </span>
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
                                    <form
                                    >
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
                                            {activeRoleIndex !== null && (
                                                <div className="w-full md:w-[75%] mt-5 flex flex-col gap-2 permissions-list">
                                                    {allpermissions.map((permission, index) => (
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
                                            )}
                                        </div>
                                        <div className="submit flex w-full md:w-[75%] h-auto justify-center my-5">
                                            <button
                                                type="button"
                                                onClick={handleSaveChanges}
                                                className='border-2 border-slate-600 duration-300 px-10 py-5 rounded-full font-semibold cursor-pointer hover:bg-slate-600 hover:text-white'
                                            >Save changes</button>
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

export default EMPRole