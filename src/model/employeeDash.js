import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";


// export const AddEmployeeRoles = async (roleData) => {
//     try {
//         const EmployeeRolesRef = ref(database, 'healthcare/counters/employeerole');
//         const RoleCountSnapShot = await get(EmployeeRolesRef)
//         let count = 1;
//         if (RoleCountSnapShot.exists) {
//             count = RoleCountSnapShot.val() + 1;
//         }
//         const RoleID = `${count.toString().padStart(2, "0")}`;
//         await set(ref(database, `healthcare/employeeroles/` + RoleID), roleData)
//         await set(EmployeeRolesRef, count);
//         return RoleID;
//     } catch (error) {
//         console.error("Error registering role:", error);
//         throw new Error("Failed to register role. Please try again.");
//     }
// }

// export const FetchEmployeeRoles = async () => {
//     const employeeRolesRef = ref(database, 'healthcare/employeeroles');  // Update path if needed
//     const snapshot = await get(employeeRolesRef);

//     if (snapshot.exists()) {
//         return snapshot.val();  // This returns all roles as an object
//     } else {
//         return {};  // Return empty if no roles found
//     }
// }
export const AddEmployeeRoles = async (roleData) => {
    try {
        const EmployeeRolesRef = ref(database, 'healthcare/counters/employeerole');
        const RoleCountSnapShot = await get(EmployeeRolesRef);

        let count = 1;
        if (RoleCountSnapShot.exists()) {
            count = RoleCountSnapShot.val() + 1;
        }

        const RoleID = `${count.toString().padStart(2, "0")}`;

        // Save the role with the position field included
        await set(ref(database, `healthcare/employeeroles/` + RoleID), roleData);

        // Update the counter
        await set(EmployeeRolesRef, count);

        return RoleID;  // Return the ID of the new role
    } catch (error) {
        console.error("Error registering role:", error);
        throw new Error("Failed to register role. Please try again.");
    }
};

export const FetchEmployeeRoles = async () => {
    const employeeRolesRef = ref(database, 'healthcare/employeeroles');
    const snapshot = await get(employeeRolesRef);

    if (snapshot.exists()) {
        const rolesData = snapshot.val();

        // Convert the roles object to an array and sort by the `position` field
        const rolesArray = Object.keys(rolesData)
            .map(roleId => ({
                id: roleId,
                ...rolesData[roleId]
            }))
            .sort((a, b) => a.position - b.position);  // Sort by position

        return rolesArray;
    } else {
        return [];  // Return an empty array if no roles are found
    }
};



export const DeleteEmployeeRole = async (roleId) => {
    try {
        const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
        await remove(roleRef); // This removes the role from the Firebase database
        return true;
    } catch (error) {
        console.error("Error deleting role:", error);
        throw new Error("Failed to delete role. Please try again.");
    }
};