import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";


export const AddEmployeeRoles = async (roleData) => {
    try {
        const EmployeeRolesRef = ref(database, 'company/counters/employeerole');
        const RoleCountSnapShot = await get(EmployeeRolesRef)
        let count = 1;
        if (RoleCountSnapShot.exists) {
            count = RoleCountSnapShot.val() + 1;
        }
        const RoleID = `${count.toString().padStart(2, "0")}`;
        await set(ref(database, `company/employeeroles/` + RoleID), roleData)
        await set(EmployeeRolesRef, count);
        return RoleID;
    } catch (error) {
        console.error("Error registering role:", error);
        throw new Error("Failed to register role. Please try again.");
    }
}


export const updateRoleInDatabase = async (RoleID, updatedRoleData) => {
    if (Object.keys(updatedRoleData).length === 0) return; // No changes to update

    const roleRef = ref(database, `company/employeeroles/${RoleID}`);
    await update(roleRef, updatedRoleData);
};

export const fetchEmployeeRoles = (setRoles) => {
    const rolesRef = ref(database, 'company/employeeroles');

    onValue(rolesRef, (snapshot) => {
        const rolesData = snapshot.val();
        if (rolesData) {
            // Map over roles and ensure the object structure is correct
            const rolesArray = Object.keys(rolesData).map(key => ({
                id: key,  // Store the role's ID
                roleName: rolesData[key].roleName,  // Ensure roleName is accessed properly
                permissions: rolesData[key].permissions || {}
            }));
            setRoles(rolesArray);  // Set roles in the state
        } else {
            setRoles([]);  // No roles found
        }
    });
};
