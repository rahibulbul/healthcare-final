// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { AddUserCategory, CheckUserCategory } from "../../../../../model/userHandle";

// const EMPUserCategory = () => {
//     const [userCategory, setUserCategory] = useState("");
//     const [userCategoryError, setUserCategoryError] = useState("");
//     const [isUserCategoryTouched, setIsUserCategoryTouched] = useState(false);
//     const [isUserCategoryValid, setIsUserCategoryValid] = useState(false);

//     const [userCategoryInfo, setUserCategoryInfo] = useState("");
//     const [userCategoryInfoError, setUserCategoryInfoError] = useState("");
//     const [isUserCategoryInfoTouched, setIsUserCategoryInfoTouched] = useState(false);
//     const [isUserCategoryInfoValid, setIsUserCategoryInfoValid] = useState(false);

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const userCategoryValidate = async (value) => {
//         if (value.length === 0) {
//             setUserCategoryError("User category cannot be empty.");
//             setIsUserCategoryValid(false);
//         } else if (value.length < 3) {
//             setUserCategoryError("User category name is so small.")
//             setIsUserCategoryValid(false);
//         } else {
//             const isUserCategoryTaken = await CheckUserCategory(value);
//             if (isUserCategoryTaken) {
//                 setUserCategoryError("User category already exists.");
//                 setIsUserCategoryValid(false);
//             } else {
//                 setUserCategoryError("");
//                 setIsUserCategoryValid(true);
//             }
//         }
//     }

//     const handleUserCategoryChange = async (e) => {
//         const value = e.target.value.toLowerCase();
//         setUserCategory(value);
//         if (isUserCategoryTouched) {
//             await userCategoryValidate(e.target.value);
//         }
//     };

//     const handleUserCategoryBlur = () => {
//         setIsUserCategoryTouched(true);
//         userCategoryValidate(userCategory);
//     }

//     const UserCategoryInfoValidate = (value) => {
//         if (value.length === 0) {
//             setUserCategoryInfoError("User category cannot be empty.");
//             setIsUserCategoryInfoValid(false);
//         } else if (value.length < 20) {
//             setUserCategoryInfoError("User category info is too short.")
//             setIsUserCategoryInfoValid(false);
//         } else {
//             setUserCategoryInfoError("");
//             setIsUserCategoryInfoValid(true);
//         }
//     }

//     const handleUserCategoryInfoChange = (e) => {
//         setUserCategoryInfo(e.target.value);
//         if (isUserCategoryInfoTouched) {
//             UserCategoryInfoValidate(e.target.value);
//         }
//     }
//     const handleUserCategoryInfoBlur = () => {
//         setIsUserCategoryInfoTouched(true);
//         UserCategoryInfoValidate(userCategoryInfo);
//     }

//     const HandleUserCategory = async (e) => {
//         e.preventDefault();
//         setIsUserCategoryTouched(true);

//         await userCategoryValidate(userCategory);

//         if (!isUserCategoryValid) {
//             toast.warning("Please fix the errors before submitting.");
//             setIsSubmitting(false);
//             return;
//         }
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         if (isUserCategoryValid) {
//             try {
//                 const userCategoryData = {
//                     description: `This category named as: ${userCategory}`,
//                     createdAt: Date.now()
//                 };
//                 await AddUserCategory(userCategory, userCategoryData);
//                 toast.success(`User category added successfully: ${userCategory}`);

//                 setUserCategory("");
//                 setIsUserCategoryTouched(false);
//                 setIsUserCategoryValid(false);
//             } catch (error) {
//                 console.error("Error adding user category:", error);
//                 toast.error("Failed to add user category");
//             }
//         }

//         setIsSubmitting(false);
//     };


//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="p-5 title flex flex-col fixed h-28 bg-white w-full z-50">
//                 <span className='text-3xl font-bold text-slate-600'>Users category</span>
//                 <span className='text-base font-medium text-slate-500'>This page is to set user category to the company</span>
//             </div>
//             <div className="p-5 content w-full mt-20 overflow-hidden overflow-y-auto">
//                 <form className='w-full' onSubmit={HandleUserCategory}>
//                     <div className="w-full">
//                         <div
//                             className="relative input w-[95%] md:w-[75%] mt-8 flex items-center"
//                         >
//                             <input
//                                 type="text"
//                                 name="userCategory"
//                                 id="userCategory"
//                                 className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
//                                 required
//                                 value={userCategory}
//                                 onChange={handleUserCategoryChange}
//                                 onBlur={handleUserCategoryBlur}
//                             />
//                             <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryError && isUserCategoryTouched ? "" : "hidden"}`}></i>
//                             <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryValid ? "" : "hidden"}`}></i>
//                             <label
//                                 htmlFor="userCategory"
//                                 className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
//                             >
//                                 Enter user category
//                             </label>
//                             <span
//                                 className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
//                             >
//                                 {userCategoryError}
//                             </span>
//                         </div>
//                         <div
//                             className="relative input w-[95%] md:w-[75%] mt-10 flex items-center"
//                         >
//                             <input
//                                 type="text"
//                                 name="userCategoryInfo"
//                                 id="userCategoryInfo"
//                                 className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
//                                 required
//                                 value={userCategoryInfo}
//                                 onChange={handleUserCategoryInfoChange}
//                                 onBlur={handleUserCategoryInfoBlur}
//                             />
//                             <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryInfoError && isUserCategoryInfoTouched ? "" : "hidden"}`}></i>
//                             <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryInfoValid ? "" : "hidden"}`}></i>
//                             <label
//                                 htmlFor="userCategoryInfo"
//                                 className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
//                             >
//                                 Enter user category information
//                             </label>
//                             <span
//                                 className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
//                             >
//                                 {userCategoryInfoError}
//                             </span>
//                         </div>
//                     </div>
//                     <div className="button w-full md:w-[75%] flex justify-center mt-10">
//                         <input
//                             type="submit"
//                             value="Add user category"
//                             className='border-2 py-3 px-10 md:px-32 text-slate-500 rounded-3xl font-semibold text-2xl border-slate-300 cursor-pointer hover:border-black duration-500 hover:shadow-ui-bold hover:text-black'
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default EMPUserCategory

// import React, { useState } from 'react';
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { AddUserCategory, CheckUserCategory } from "../../../../../model/userHandle";

// const EMPUserCategory = () => {
//     const [userCategory, setUserCategory] = useState("");
//     const [userCategoryError, setUserCategoryError] = useState("");
//     const [isUserCategoryTouched, setIsUserCategoryTouched] = useState(false);
//     const [isUserCategoryValid, setIsUserCategoryValid] = useState(false);

//     const [userCategoryInfo, setUserCategoryInfo] = useState("");
//     const [userCategoryInfoError, setUserCategoryInfoError] = useState("");
//     const [isUserCategoryInfoTouched, setIsUserCategoryInfoTouched] = useState(false);
//     const [isUserCategoryInfoValid, setIsUserCategoryInfoValid] = useState(false);

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Validate user category name
//     const userCategoryValidate = async (value) => {
//         if (value.length === 0) {
//             setUserCategoryError("User category cannot be empty.");
//             setIsUserCategoryValid(false);
//         } else if (value.length < 3) {
//             setUserCategoryError("User category name is too short.");
//             setIsUserCategoryValid(false);
//         } else {
//             // Check if the category already exists
//             const isUserCategoryTaken = await CheckUserCategory(value);
//             if (isUserCategoryTaken) {
//                 setUserCategoryError("User category already exists.");
//                 setIsUserCategoryValid(false);
//             } else {
//                 setUserCategoryError("");
//                 setIsUserCategoryValid(true);
//             }
//         }
//     };

//     // Validate user category info
//     const UserCategoryInfoValidate = (value) => {
//         if (value.length === 0) {
//             setUserCategoryInfoError("User category info cannot be empty.");
//             setIsUserCategoryInfoValid(false);
//         } else if (value.length < 20) {
//             setUserCategoryInfoError("User category info is too short.");
//             setIsUserCategoryInfoValid(false);
//         } else {
//             setUserCategoryInfoError("");
//             setIsUserCategoryInfoValid(true);
//         }
//     };

//     const handleUserCategoryChange = async (e) => {
//         const value = e.target.value.toLowerCase();
//         setUserCategory(value);
//         if (isUserCategoryTouched) {
//             await userCategoryValidate(value);
//         }
//     };

//     const handleUserCategoryBlur = () => {
//         setIsUserCategoryTouched(true);
//         userCategoryValidate(userCategory);
//     };

//     const handleUserCategoryInfoChange = (e) => {
//         const value = e.target.value;
//         setUserCategoryInfo(value);
//         if (isUserCategoryInfoTouched) {
//             UserCategoryInfoValidate(value);
//         }
//     };

//     const handleUserCategoryInfoBlur = () => {
//         setIsUserCategoryInfoTouched(true);
//         UserCategoryInfoValidate(userCategoryInfo);
//     };

//     const HandleUserCategory = async (e) => {
//         e.preventDefault();
//         setIsUserCategoryTouched(true);
//         setIsUserCategoryInfoTouched(true);

//         await userCategoryValidate(userCategory);
//         UserCategoryInfoValidate(userCategoryInfo);

//         if (!isUserCategoryValid || !isUserCategoryInfoValid) {
//             toast.warning("Please fix the errors before submitting.");
//             setIsSubmitting(false);
//             return;
//         }
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         if (isUserCategoryValid && isUserCategoryInfoValid) {
//             try {
//                 const userCategoryData = {
//                     userCategoryInfo,
//                     lastUpdated: Date.now(), // Timestamp for last updated/added time
//                 };
//                 await AddUserCategory(userCategory, userCategoryData);
//                 toast.success(`User category added successfully: ${userCategory}`);

//                 // Reset form state
//                 setUserCategory("");
//                 setUserCategoryInfo("");
//                 setIsUserCategoryTouched(false);
//                 setIsUserCategoryInfoTouched(false);
//                 setIsUserCategoryValid(false);
//                 setIsUserCategoryInfoValid(false);
//             } catch (error) {
//                 console.error("Error adding user category:", error);
//                 toast.error("Failed to add user category");
//             }
//         }

//         setIsSubmitting(false);
//     };

//     return (
//         <div className='w-full h-[calc(100vh-65px)]'>
//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//                 transition={Slide}
//             />
//             <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-50">
//                 <span className='text-3xl font-bold text-slate-600'>Users category</span>
//                 <span className='text-base font-medium text-slate-500'>This page is to set user category to the company</span>
//             </div>
//             <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
//                 <form className='w-full' onSubmit={HandleUserCategory}>
//                     <div className="w-full">
//                         <div className="relative input w-[95%] md:w-[75%] mt-8 flex items-center">
//                             <input
//                                 type="text"
//                                 name="userCategory"
//                                 id="userCategory"
//                                 className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
//                                 required
//                                 value={userCategory}
//                                 onChange={handleUserCategoryChange}
//                                 onBlur={handleUserCategoryBlur}
//                             />
//                             <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryError && isUserCategoryTouched ? "" : "hidden"}`}></i>
//                             <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryValid ? "" : "hidden"}`}></i>
//                             <label
//                                 htmlFor="userCategory"
//                                 className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
//                             >
//                                 Enter user category
//                             </label>
//                             <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>
//                                 {userCategoryError}
//                             </span>
//                         </div>
//                         <div className="relative input w-[95%] md:w-[75%] mt-10 flex items-center">
//                             <input
//                                 type="text"
//                                 name="userCategoryInfo"
//                                 id="userCategoryInfo"
//                                 className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
//                                 required
//                                 value={userCategoryInfo}
//                                 onChange={handleUserCategoryInfoChange}
//                                 onBlur={handleUserCategoryInfoBlur}
//                             />
//                             <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryInfoError && isUserCategoryInfoTouched ? "" : "hidden"}`}></i>
//                             <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryInfoValid ? "" : "hidden"}`}></i>
//                             <label
//                                 htmlFor="userCategoryInfo"
//                                 className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
//                             >
//                                 Enter user category information
//                             </label>
//                             <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>
//                                 {userCategoryInfoError}
//                             </span>
//                         </div>
//                     </div>
//                     <div className="button w-full md:w-[75%] flex justify-center mt-10">
//                         <input
//                             type="submit"
//                             value="Add user category"
//                             className='border-2 py-3 px-10 md:px-32 text-slate-500 rounded-3xl font-semibold text-2xl border-slate-300 cursor-pointer hover:border-black duration-500 hover:shadow-ui-bold hover:text-black'
//                         />
//                     </div>
//                 </form>
//             </div>
//             <div className="fetch-category p-5 w-[95%] mt-10">

//             </div>
//         </div>
//     );
// };

// export default EMPUserCategory;

import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { AddUserCategory, CheckUserCategory } from "../../../../../model/userHandle";

const EMPUserCategory = () => {
    const [userCategory, setUserCategory] = useState("");
    const [userCategoryError, setUserCategoryError] = useState("");
    const [isUserCategoryTouched, setIsUserCategoryTouched] = useState(false);
    const [isUserCategoryValid, setIsUserCategoryValid] = useState(false);

    const [userCategoryInfo, setUserCategoryInfo] = useState("");
    const [userCategoryInfoError, setUserCategoryInfoError] = useState("");
    const [isUserCategoryInfoTouched, setIsUserCategoryInfoTouched] = useState(false);
    const [isUserCategoryInfoValid, setIsUserCategoryInfoValid] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate user category name
    const userCategoryValidate = async (value) => {
        if (value.length === 0) {
            setUserCategoryError("User category cannot be empty.");
            setIsUserCategoryValid(false);
        } else if (value.length < 3) {
            setUserCategoryError("User category name is too short.");
            setIsUserCategoryValid(false);
        } else {
            const isUserCategoryTaken = await CheckUserCategory(value);
            if (isUserCategoryTaken) {
                setUserCategoryError("User category already exists.");
                setIsUserCategoryValid(false);
            } else {
                setUserCategoryError("");
                setIsUserCategoryValid(true);
            }
        }
    };

    // Validate user category info
    const UserCategoryInfoValidate = (value) => {
        if (value.length === 0) {
            setUserCategoryInfoError("User category info cannot be empty.");
            setIsUserCategoryInfoValid(false);
        } else if (value.length < 20) {
            setUserCategoryInfoError("User category info is too short.");
            setIsUserCategoryInfoValid(false);
        } else {
            setUserCategoryInfoError("");
            setIsUserCategoryInfoValid(true);
        }
    };

    const handleUserCategoryChange = async (e) => {
        const value = e.target.value.toLowerCase();
        setUserCategory(value);
        if (isUserCategoryTouched) {
            await userCategoryValidate(value);
        }
    };

    const handleUserCategoryBlur = () => {
        setIsUserCategoryTouched(true);
        userCategoryValidate(userCategory);
    };

    const handleUserCategoryInfoChange = (e) => {
        const value = e.target.value;
        setUserCategoryInfo(value);
        if (isUserCategoryInfoTouched) {
            UserCategoryInfoValidate(value);
        }
    };

    const handleUserCategoryInfoBlur = () => {
        setIsUserCategoryInfoTouched(true);
        UserCategoryInfoValidate(userCategoryInfo);
    };

    // Handle the form submission
    const HandleUserCategory = async (e) => {
        e.preventDefault();
        setIsUserCategoryTouched(true);
        setIsUserCategoryInfoTouched(true);

        await userCategoryValidate(userCategory);
        UserCategoryInfoValidate(userCategoryInfo);

        if (!isUserCategoryValid || !isUserCategoryInfoValid) {
            toast.warning("Please fix the errors before submitting.");
            setIsSubmitting(false);
            return;
        }
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (isUserCategoryValid && isUserCategoryInfoValid) {
            try {
                const userCategoryData = {
                    userCategoryInfo,
                    lastUpdated: Date.now(), // Timestamp for last updated/added time
                };

                // Call the AddUserCategory function and generate the correct ID
                const categoryId = await AddUserCategory(userCategory, userCategoryData);

                toast.success(`User category added successfully: ${categoryId}`);

                // Reset form state
                setUserCategory("");
                setUserCategoryInfo("");
                setIsUserCategoryTouched(false);
                setIsUserCategoryInfoTouched(false);
                setIsUserCategoryValid(false);
                setIsUserCategoryInfoValid(false);
            } catch (error) {
                console.error("Error adding user category:", error);
                toast.error("Failed to add user category");
            }
        }

        setIsSubmitting(false);
    };

    return (
        <div className='w-full h-[calc(100vh-65px)]'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className="p-5 title flex flex-col fixed h-28 bg-white w-full z-50">
                <span className='text-3xl font-bold text-slate-600'>Users category</span>
                <span className='text-base font-medium text-slate-500'>This page is to set user category to the company</span>
            </div>
            <div className="p-5 content w-full mt-20 overflow-hidden overflow-y-auto">
                <form className='w-full' onSubmit={HandleUserCategory}>
                    <div className="w-full">
                        <div className="relative input w-[95%] md:w-[75%] mt-8 flex items-center">
                            <input
                                type="text"
                                name="userCategory"
                                id="userCategory"
                                className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                required
                                value={userCategory}
                                onChange={handleUserCategoryChange}
                                onBlur={handleUserCategoryBlur}
                            />
                            <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryError && isUserCategoryTouched ? "" : "hidden"}`}></i>
                            <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryValid ? "" : "hidden"}`}></i>
                            <label
                                htmlFor="userCategory"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Enter user category
                            </label>
                            <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>
                                {userCategoryError}
                            </span>
                        </div>
                        <div className="relative input w-[95%] md:w-[75%] mt-10 flex items-center">
                            <input
                                type="text"
                                name="userCategoryInfo"
                                id="userCategoryInfo"
                                className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                required
                                value={userCategoryInfo}
                                onChange={handleUserCategoryInfoChange}
                                onBlur={handleUserCategoryInfoBlur}
                            />
                            <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryInfoError && isUserCategoryInfoTouched ? "" : "hidden"}`}></i>
                            <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryInfoValid ? "" : "hidden"}`}></i>
                            <label
                                htmlFor="userCategoryInfo"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Enter user category information
                            </label>
                            <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>
                                {userCategoryInfoError}
                            </span>
                        </div>
                    </div>
                    <div className="button w-full md:w-[75%] flex justify-center mt-10">
                        <input
                            type="submit"
                            value="Add user category"
                            className='border-2 py-3 px-10 md:px-32 text-slate-500 rounded-3xl font-semibold text-2xl border-slate-300 cursor-pointer hover:border-black duration-500 hover:shadow-ui-bold hover:text-black'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EMPUserCategory;
