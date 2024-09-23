import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, off, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";


export const CheckUserCategory = async (userCategory) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }

    try {
        const userCategoryRef = ref(database, 'healthcare/userscategory');
        const userCategoryQuery = query(userCategoryRef, orderByChild('usercategory'), equalTo(userCategory));

        const snapshot = await get(userCategoryQuery);

        if (snapshot.exists()) {
            return true; // Category exists
        }

        return false; // Category does not exist
    } catch (error) {
        console.error("Error checking user category:", error);
        return false; // Return false in case of an error
    }
};

export const AddUserCategory = async (userCategory, userCategoryData) => {
    if (!database) {
        throw new Error("Firebase database is not initialized");
    }
    const counterRef = child(ref(database, "/healthcare/counters"), "userCategoryCounter");
    const snapshot = await get(counterRef);
    let nextId = 1;
    if (snapshot.exists()) {
        nextId = snapshot.val() + 1;
    } else {
        await set(counterRef, nextId);
    }
    const categoryId = `${nextId}`;
    const AddUserCategoryRef = ref(database, `healthcare/userscategory/${categoryId}`);
    await set(AddUserCategoryRef, {
        usercategory: userCategory,
        ...userCategoryData,
        categoryId
    });
    await set(counterRef, nextId);
    return categoryId;
};

export const FetchUserCategory = (callback) => {
    const userCategoryRef = ref(database, 'healthcare/userscategory');

    const unsubscribe = onValue(userCategoryRef, (snapshot) => {
        const categoriesData = snapshot.val();
        if (categoriesData) {
            const formattedCategories = Object.keys(categoriesData)
                .map((key) => ({
                    id: key,
                    ...categoriesData[key],
                }))
                .filter((category) => category.showCategory !== false);
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
        const userCategoryRef = ref(database, "healthcare/userscategory");
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
        const usersRef = ref(database, "healthcare/user/");
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
        const RegisterUserCountRef = ref(database, `healthcare/counters/userscounts/${year}/${month}/${week}/${userCategory}`);
        const UserCountSnapshot = await get(RegisterUserCountRef);
        let count = 1;
        if (UserCountSnapshot.exists()) {
            count = UserCountSnapshot.val() + 1;
        }
        const UserID = `${year}${month}${userPrefix}${count.toString().padStart(2, "0")}`;
        await set(ref(database, `healthcare/user/` + UserID), userData);
        await set(RegisterUserCountRef, count);
        return UserID;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user. Please try again.");
    }
}

export const UserLogin = async (userName, password) => {
    try {
        const usersRef = ref(database, "healthcare/user/");
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
    const usersRef = ref(database, "healthcare/user/");
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


// export const LoginUserData = async () => {
//     const userData = JSON.parse(sessionStorage.getItem("userData"));

//     if (userData && userData.fullname) {
//         console.log("User full name retrieved:", userData.fullname);
//         const { password, ...filteredUserData } = userData;
//         return filteredUserData;
//     } else {
//         console.error("User data or full name is missing from sessionStorage");
//         return null;
//     }
// };


export const LoginUserData = async (callback) => {
    // Retrieve the userData from sessionStorage
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    // Check if userData and userID exist
    if (userData && userData.userID) {
        console.log("User ID retrieved from sessionStorage:", userData.userID);

        // Reference to the specific user in the Firebase Realtime Database
        const userRef = ref(database, `healthcare/user/${userData.userID}`);

        // Set up a real-time listener for the specific user data
        const listener = onValue(userRef, (snapshot) => {
            const userDetails = snapshot.val();
            if (userDetails) {
                console.log("Real-time user data fetched:", userDetails);

                // Filter out password from the data
                const { password, ...filteredUserData } = userDetails;

                // Callback to return the filtered user data
                callback(filteredUserData);
            } else {
                console.error("No data found for the user in Firebase.");
                callback(null);
            }
        });

        // Return a cleanup function to remove the listener when needed
        return () => {
            off(userRef, 'value', listener); // Remove the real-time listener using off()
        };
    } else {
        console.error("User data or userID is missing from sessionStorage");
        callback(null);
    }
};

export const useRealTimeUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem("userData"));

        if (sessionData && sessionData.userID) {
            const userID = sessionData.userID;
            const userRef = ref(database, `healthcare/user/${userID}`);

            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserData(data);
                } else {
                    setError("No user data found");
                }
                setLoading(false);
            });

            return () => {
                unsubscribe();
            };
        } else {
            setError("No user data in sessionStorage");
            setLoading(false);
        }
    }, []);

    return { userData, setUserData, loading, error };
};