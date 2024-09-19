import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";


export const AddEmployeeRoles = async (roleData) => {
    try {
        const EmployeeRolesRef = ref(database, 'healthcare/counters/employeerole');
        const RoleCountSnapShot = await get(EmployeeRolesRef)
        let count = 1;
        if (RoleCountSnapShot.exists) {
            count = RoleCountSnapShot.val() + 1;
        }
        const RoleID = `${count.toString().padStart(2, "0")}`;
        await set(ref(database, `healthcare/employeeroles/` + RoleID), roleData)
        await set(EmployeeRolesRef, count);
        return RoleID;
    } catch (error) {
        console.error("Error registering role:", error);
        throw new Error("Failed to register role. Please try again.");
    }
}

export const FetchEmployeeRoles = async () => {
    const employeeRolesRef = ref(database, 'healthcare/employeeroles');  // Update path if needed
    const snapshot = await get(employeeRolesRef);

    if (snapshot.exists()) {
        return snapshot.val();  // This returns all roles as an object
    } else {
        return {};  // Return empty if no roles found
    }
}

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