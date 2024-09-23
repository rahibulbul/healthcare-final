import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";

export const AddEmployeeRoles = async (roleData) => {
    try {
        const EmployeeRolesRef = ref(database, 'healthcare/counters/employeerole');
        const RoleCountSnapShot = await get(EmployeeRolesRef);
        let count = 1;
        if (RoleCountSnapShot.exists()) {
            count = RoleCountSnapShot.val() + 1;
        }
        const RoleID = `${count.toString().padStart(2, "0")}`;
        await set(ref(database, `healthcare/employeeroles/` + RoleID), roleData);
        await set(EmployeeRolesRef, count);
        return RoleID;
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
        const rolesArray = Object.keys(rolesData)
            .map(roleId => ({
                id: roleId,
                ...rolesData[roleId]
            }))
            .sort((a, b) => a.position - b.position);
        return rolesArray;
    } else {
        return [];
    }
};

export const FetchEmployeeRoleById = async (roleId) => {
    const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
    const roleSnapshot = await get(roleRef);

    if (roleSnapshot.exists()) {
        const roleData = roleSnapshot.val();
        return {
            roleName: roleData.roleName,
            permissions: roleData.permissions
        };
    } else {
        throw new Error("Role not found");
    }
};

export const DeleteEmployeeRole = async (roleId) => {
    const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
    try {
        await remove(roleRef);
        console.log(`Role ${roleId} deleted successfully`);
    } catch (error) {
        console.error("Error deleting role:", error);
        throw new Error("Failed to delete role");
    }
};

export const UpdateEmployeeRole = async (roleId, updatedRoleData) => {
    if (!roleId) {
        throw new Error("Role ID is undefined. Cannot update role.");
    }
    const roleRef = ref(database, `healthcare/employeeroles/${roleId}`);
    const roleWithId = { ...updatedRoleData, id: roleId };
    try {
        await set(roleRef, roleWithId);
        console.log(`Role ${roleId} updated successfully`);
    } catch (error) {
        console.error("Error updating role:", error);
        throw new Error("Failed to update role");
    }
};
