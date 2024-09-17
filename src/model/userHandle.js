import { useEffect, useState } from 'react';
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

export const UseUserCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const userCategoryRef = ref(database, "users/userscategory");
        const unsubscribe = onValue(userCategoryRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const fetchedCategories = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key,
                }));
                setCategories(fetchedCategories);
            } else {
                setCategories([]);
            }
        });
        return () => unsubscribe();
    }, []);

    return categories;
};

export const findingUserName = async (username) => {
    try {
        const usersRef = ref(database, "users/user/");
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
            const usersData = usersSnapshot.val();

            for (const userId in usersData) {
                const userData = usersData[userId];
                if (userData.username === username) {
                    return false;
                }
            }
        }
        return true;
    } catch (error) {
        console.error("Error checking username availability:", error.message);
        throw new Error("Failed to check username availability.");
    }
};


export const UserRegistration = async (userData, userCategory, year, month, week, userPrefix) => {
    try {
        const RegisterUserCountRef = ref(database, `counters/userscounts/${year}/${month}/${week}/${userCategory}`);
        const UserCountSnapshot = await get(RegisterUserCountRef);
        let count = 1;
        if (UserCountSnapshot.exists()) {
            count = UserCountSnapshot.val() + 1;
        }
        const UserID = `${year}${month}${userPrefix}${count.toString().padStart(2, "0")}`;
        await set(ref(database, `users/user/` + UserID), userData);
        await set(RegisterUserCountRef, count);
        return UserID;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user. Please try again.");
    }
}
export const UserLogin = async (userName, password) => {
    try {
        const usersRef = ref(database, "users/user/");
        const usersSnapshot = await get(usersRef);
        let userData = null;
        if (usersSnapshot.exists()) {
            usersSnapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (data.username === userName) {
                    if (data.password === password) {
                        userData = {
                            ...data,
                            userID: childSnapshot.key,
                        };
                    }
                }
            });
        }
        if (userData) {
            return { success: true, data: userData };
        } else {
            return { success: false, message: "Incorrect username or password." };
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return { success: false, message: "Login failed due to an error." };
    }
};

export const FetchUsers = (callback) => {
    const usersRef = ref(database, "users/user/");
    const unsubscribe = onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
            const formattedUsers = Object.keys(usersData).map((key) => ({
                id: key,
                ...usersData[key],
            }))
            callback(formattedUsers);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
}


export const LoginUserData = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.fullname) {
        console.log("User full name retrieved:", userData.fullname);
        const { password, ...filteredUserData } = userData;
        return filteredUserData;
    } else {
        console.error("User data or full name is missing from sessionStorage");
        return null;
    }
};
