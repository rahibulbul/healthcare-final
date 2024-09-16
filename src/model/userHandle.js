import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";

export const CheckUserCategory = async (userCategory) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }
    const userCategoryRef = ref(database, 'users/userscategory');
    const userCategoryQuery = query(userCategoryRef, orderByChild('usercategory'), equalTo(userCategory));
    const snapshot = await get(userCategoryQuery);
    if (snapshot.exists()) {
        return true;
    }
    return false;
};

// export const AddUserCategory = async (userCategory, userCategoryData) => {
//     if (!database) {
//         throw new Error("Firebase database is not initialized");
//     }
//     const prefix = userCategory.slice(0, 2).toUpperCase();
//     const counterRef = child(ref(database, "counters"), "userCategoryCounter");
//     const snapshot = await get(counterRef);
//     let nextId = 1;
//     if (snapshot.exists()) {
//         nextId = snapshot.val() + 1;
//     } else {
//         await set(counterRef, nextId);
//     }
//     const categoryId = `${prefix}${nextId}`;
//     const AddUserCategoryRef = ref(database, `users/userscategory/${categoryId}`);
//     await set(AddUserCategoryRef, {
//         usercategory: userCategory,
//         ...userCategoryData,
//         categoryId
//     });
//     await set(counterRef, nextId);
//     return categoryId;
// };


export const FetchUserCategory = (callback) => {
    const userCategoryRef = ref(database, 'users/userscategory');
    const unsubscribe = onValue(userCategoryRef, (snapshot) => {
        const categoriesData = snapshot.val();
        if (categoriesData) {
            const formattedCategories = Object.keys(categoriesData).map((key) => ({
                id: key,
                ...categoriesData[key],
            }));
            callback(formattedCategories);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
};
export const AddUserCategory = async (userCategory, userCategoryData) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }

    // Reference to counters and availableIds in Firebase
    const counterRef = ref(database, "counters/userCategoryCounter");
    const availableIdsRef = ref(database, "counters/availableIds");

    // Fetch available IDs from the database
    const availableIdsSnapshot = await get(availableIdsRef);
    let availableIds = availableIdsSnapshot.exists() ? availableIdsSnapshot.val() : [];

    // Determine the next ID: use from availableIds or increment the counter
    let nextId;
    if (availableIds.length > 0) {
        // Use the lowest available ID
        nextId = Math.min(...availableIds);
        // Remove the used ID from availableIds
        availableIds = availableIds.filter(id => id !== nextId);
    } else {
        // Fetch the current counter value
        const counterSnapshot = await get(counterRef);
        nextId = counterSnapshot.exists() ? counterSnapshot.val() + 1 : 1;
        // Update the counter in Firebase
        await set(counterRef, nextId);
    }

    // Reference to the new user category in Firebase
    const AddUserCategoryRef = ref(database, `users/userscategory/${nextId}`);
    await set(AddUserCategoryRef, {
        usercategory: userCategory,
        ...userCategoryData,
        id: nextId, // Use this ID as the key
    });

    // Update the available IDs in Firebase after usage
    await set(availableIdsRef, availableIds); // Update the list to remove used ID

    return nextId;
};

// Function to handle category deletion and make the ID available again
export const DeleteUserCategory = async (id) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }

    // Delete the category from the database
    const userCategoryRef = ref(database, `users/userscategory/${id}`);
    await set(userCategoryRef, null);

    // Add the numeric ID back to availableIds
    const availableIdsRef = ref(database, "counters/availableIds");
    const availableIdsSnapshot = await get(availableIdsRef);
    let availableIds = availableIdsSnapshot.exists() ? availableIdsSnapshot.val() : [];

    // Add the deleted ID to the list if it's not already there
    availableIds.push(id);
    availableIds = [...new Set(availableIds)].sort((a, b) => a - b); // Ensure uniqueness and sorting

    // Update the availableIds in Firebase
    await set(availableIdsRef, availableIds);
};