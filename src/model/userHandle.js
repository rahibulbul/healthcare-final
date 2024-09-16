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

export const AddUserCategory = async (userCategory, userCategoryData) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }
    // const prefix = userCategory.slice(0, 2).toUpperCase();
    const counterRef = child(ref(database, "counters"), "userCategoryCounter");
    const snapshot = await get(counterRef);
    let nextId = 1;
    if (snapshot.exists()) {
        nextId = snapshot.val() + 1;
    } else {
        await set(counterRef, nextId);
    }
    const categoryId = `${nextId}`;
    const AddUserCategoryRef = ref(database, `users/userscategory/${categoryId}`);
    await set(AddUserCategoryRef, {
        usercategory: userCategory,
        ...userCategoryData,
        categoryId
    });
    await set(counterRef, nextId);
    return categoryId;
};


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
