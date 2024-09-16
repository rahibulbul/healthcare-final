import { database } from './firebaseConfig';
import { child, equalTo, get, orderByChild, query, ref, set } from "firebase/database";

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
//     const AddUserCategoryRef = ref(database, 'users/userscategory');
//     const counterRef = child(ref(database, "counters"), "userCategoryCounter");
//     const snapshot = await get(counterRef);
//     let nextId = 1;
//     if (snapshot.exists()) {
//         nextId = snapshot.val() + 1;
//     } else {
//         await set(counterRef, nextId);
//     }
//     const newUserCategoryRef = child(AddUserCategoryRef, nextId.toString());
//     await set(newUserCategoryRef, {
//         usercategory: userCategory,
//         ...userCategoryData
//     });
//     await set(counterRef, nextId);
//     return nextId;
// };
export const AddUserCategory = async (userCategory, userCategoryData) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }

    // Step 1: Generate category ID (first two letters capitalized + counter)
    const prefix = userCategory.slice(0, 2).toUpperCase();  // Get first two letters and capitalize
    const counterRef = child(ref(database, "counters"), "userCategoryCounter");

    const snapshot = await get(counterRef);
    let nextId = 1;

    if (snapshot.exists()) {
        nextId = snapshot.val() + 1;  // Increment counter
    } else {
        await set(counterRef, nextId);  // Initialize counter if not exists
    }

    // Generate the final category ID
    const categoryId = `${prefix}${nextId}`;

    // Step 2: Set the new category in the database, using the categoryId as the key
    const AddUserCategoryRef = ref(database, `users/userscategory/${categoryId}`);
    await set(AddUserCategoryRef, {
        usercategory: userCategory,  // Store the category name
        ...userCategoryData,         // Store any additional data (e.g., lastUpdated)
        categoryId                   // Store the generated category ID
    });

    // Step 3: Update the counter for the next category
    await set(counterRef, nextId);

    return categoryId;  // Return the generated category ID
};