import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";

// export const fetchEmployeeRole = async () => {
//     try {
//         const employeeRolesRef = ref(database, 'company/employeeroles');

//         const snapshot = await get(employeeRolesRef);

//         if (snapshot.exists()) {
//             const rolesData = snapshot.val();

//             // Extract only the role names (assuming each role object has a 'name' field)
//             const roleNames = Object.values(rolesData).map(role => role.name);
//             return roleNames;
//         } else {
//             console.log("No employee roles data available");
//             return [];
//         }
//     } catch (error) {
//         console.error("Error fetching employee roles: ", error);
//         return [];
//     }
// };
export const fetchEmployeeRole = async () => {
    try {
        const employeeRolesRef = ref(database, 'company/employeeroles');

        const snapshot = await get(employeeRolesRef);

        if (snapshot.exists()) {
            const rolesData = snapshot.val(); // Get the raw data

            // Convert the object (rolesData) into an array of role objects
            return Object.keys(rolesData).map(id => ({
                id, // Include the ID as part of each role
                ...rolesData[id] // Spread the rest of the role data (name and permissions)
            }));
        } else {
            console.log("No employee roles data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching employee roles: ", error);
        return [];
    }
};
