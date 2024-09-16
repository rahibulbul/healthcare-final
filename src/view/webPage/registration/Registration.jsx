import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [isTitleTouched, setIsTitleTouched] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(false);


    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [isFullNameTouched, setIsFullNameTouched] = useState(false);
    const [isFullNameValid, setIsFullNameValid] = useState(false);


    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [isUserNameTouched, setIsUserNameTouched] = useState(false);
    const [isUserNameValid, setIsUserNameValid] = useState(null);


    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    const [dob, setDob] = useState("");
    const [dobError, setDobError] = useState("");
    const [isDobTouched, setIsDobTouched] = useState(false);
    const [isDobValid, setIsDobValid] = useState(false);


    const [userCategory, setUserCategory] = useState("");
    const [userCategoryError, setUserCategoryError] = useState("");
    const [isUserCategoryTouched, setIsUserCategoryTouched] = useState(false);
    const [isUserCategoryValid, setIsUserCategoryValid] = useState(false);
    // const categories = UseUserCategories();


    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState({
        message: "Enter your password",
        color: "text-slate-500",
    });
    const [, setIsPasswordTouched] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);


    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState({
        message: "Enter your password",
        color: "text-slate-500",
    });
    const [, setIsConfirmPasswordTouched] = useState("");
    const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(0);


    const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);

    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [showTermsPanel, setShowTermsPanel] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [usernameCheckInProgress] = useState(false);

    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    }
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    }

    const handleTermsCheckboxClick = () => {
        if (!isTermsAccepted) {
            setShowTermsPanel(true);
        }
    };

    const handleTermsAccepted = () => {
        setIsTermsAccepted(true);
        setShowTermsPanel(false);
    };

    // Title Validate
    const ValidateTitle = (value) => {
        if (value.length === 0) {
            setTitleError("Title cannot be empty.");
            setIsTitleValid(false);
        } else {
            setTitleError("");
            setIsTitleValid(true);
        }
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (isTitleTouched) {
            ValidateTitle(e.target.value);
        }
    };

    const handleTitleBlur = () => {
        setIsTitleTouched(true);
        ValidateTitle(title);
    };

    // Fullname Validate
    const ValidateFullName = (value) => {
        if (value.length === 0) {
            setFullNameError("Full name cannot be empty");
            setIsFullNameValid(false);
        } else if (value.length < 3) {
            setFullNameError("Full name must be at least 3 letter.");
            setIsFullNameValid(false);
        } else {
            setFullNameError("");
            setIsFullNameValid(true);
        }
    }
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        if (isFullNameTouched) {
            ValidateFullName(e.target.value);
        }
    }
    const handleFullNameBlur = () => {
        setIsFullNameTouched(true);
        ValidateFullName(fullName);
    }
    // Username Validate
    // const validateUsername = async (value) => {
    //     if (value.length === 0) {
    //         setUsernameError("Username cannot be empty.");
    //         setIsUsernameValid(false);
    //     } else if (value.length < 3) {
    //         setUsernameError("Username must be at least 3 letters.");
    //         setIsUsernameValid(false);
    //     } else {
    //         const result = await findingUserName(value);
    //         if (result) {
    //             setUsernameError("Username is available");
    //             setIsUsernameValid(true);
    //         } else {
    //             setUsernameError("Username is already taken");
    //             setIsUsernameValid(false);
    //         }
    //         // setUsernameError("");
    //         // setIsUsernameValid(true);
    //     }
    // }
    const validateUsername = async (value) => {
        if (value.length === 0) {
            setUserNameError("Username cannot be empty.");
            setIsUserNameValid(false);
        } else if (value.length < 3) {
            setUserNameError("Username must be at least 3 letters.");
            setIsUserNameValid(false);
        } else {
            // const result = await findingUserName(value);
            // if (result) {
            //     setUserNameError("Username is available");
            //     setIsUserNameValid(true);
            // } else {
            //     setUserNameError("Username is already taken");
            //     setIsUserNameValid(false);
            // }
            setUserNameError("");
            setIsUserNameValid(true);
        }
    };

    const handleUserNameChange = async (e) => {
        const value = e.target.value.toLowerCase().replace(/\s+/g, "");
        setUserName(value);
        if (isUserNameTouched) {
            await validateUsername(value);
        }
    };

    const handleUserNameBlur = async () => {
        setIsUserNameTouched(true);
        await validateUsername(userName);
    };

    // Email validation
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length === 0) {
            setEmailError("Email cannot be empty.");
            setIsEmailValid(false);
        } else if (!emailRegex.test(value)) {
            setEmailError("Type correct email address.");
            setIsEmailValid(false);
        } else {
            setEmailError("");
            setIsEmailValid(true);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (isEmailTouched) {
            validateEmail(e.target.value);
        }
    };

    const handleEmailBlur = () => {
        setIsEmailTouched(true);
        validateEmail(email);
    };

    // Dob Validate
    const validateDob = (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();

        if (value.length === 0) {
            setDobError("Date of birth cannot be empty.");
            setIsDobValid(false);
        } else if (selectedDate > currentDate) {
            setDobError("Date of birth cannot be in the future.");
            setIsDobValid(false);
        } else {
            setDobError("");
            setIsDobValid(true);
        }
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
        if (isDobTouched) {
            validateDob(e.target.value);
        }
    };

    const handleDobBlur = () => {
        setIsDobTouched(true);
        validateDob(dob);
    };

    // UserCategory validation

    const validateUserCategory = (value) => {
        if (value.length === 0) {
            setUserCategoryError("User type cannot be empty.");
            setIsUserCategoryValid(false);
        } else {
            setUserCategoryError("");
            setIsUserCategoryValid(true);
        }
    };

    const handleUserCategoryChange = (e) => {
        setUserCategory(e.target.value);
        if (isUserCategoryTouched) {
            validateUserCategory(e.target.value);
        }
    };

    const handleUserCategoryBlur = () => {
        setIsUserCategoryTouched(true);
        validateUserCategory(userCategory);
    };

    const validatePassword = (password, setStrength) => {
        let strength = 0;
        let message = "";
        let color = "#696969"; // Default color
        let isValid = false;

        // Check for different criteria
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

        if (password.length < 8) {
            message = "Password too short";
            color = "#e74c3c";
            strength = 1;
        } else if (password.length > 20) {
            message = "Password too long";
            color = "#e74c3c";
            strength = 5;
        } else {
            let criteriaMet = 0;
            if (hasLowercase) criteriaMet++;
            if (hasUppercase) criteriaMet++;
            if (hasNumber) criteriaMet++;
            if (hasSpecialChar) criteriaMet++;

            switch (criteriaMet) {
                case 1:
                    message = "Password is good";
                    color = "#f1c40f";
                    strength = 2;
                    isValid = true;
                    break;
                case 2:
                    message = "Password is moderate";
                    color = "#e67e22";
                    strength = 3;
                    isValid = true;
                    break;
                case 3:
                    message = "Password is strong";
                    color = "#2ecc71";
                    strength = 4;
                    isValid = true;
                    break;
                case 4:
                    message = "Password is strongest";
                    color = "#27ae60";
                    strength = 5;
                    isValid = true;
                    break;
                default:
                    message = "Invalid password";
                    color = "#e74c3c";
                    strength = 1;
                    break;
            }
        }

        setStrength(strength);
        return { message, color, isValid };
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        const { message, color, isValid } = validatePassword(
            value,
            setPasswordStrength
        );
        setPasswordError({ message, color });
        setIsPasswordValid(isValid);
        if (isValid && confirmPassword.length > 0) {
            validatePasswordMatch(value, confirmPassword);
        } else {
            setIsPasswordMatched(false);
            setPasswordMatchMessage("Passwords do not match");
        }
    };

    const handlePasswordBlur = () => {
        setIsPasswordTouched(true);
        if (password.length === 0) {
            setPasswordError({
                message: "Password cannot be empty.",
                color: "#e74c3c",
            });
        } else {
            const { message, color, isValid } = validatePassword(
                password,
                setPasswordStrength
            );
            setPasswordError({ message, color });
            setIsPasswordValid(isValid);
            if (isValid && confirmPassword.length > 0) {
                validatePasswordMatch(password, confirmPassword);
            }
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        const { message, color } = validatePassword(
            value,
            setConfirmPasswordStrength
        );
        setConfirmPasswordError({ message, color });
        if (isPasswordValid) {
            validatePasswordMatch(password, value);
        }
    };

    const handleConfirmPasswordBlur = () => {
        setIsConfirmPasswordTouched(true);
        if (confirmPassword.length === 0) {
            setConfirmPasswordError({
                message: "Password cannot be empty.",
                color: "#e74c3c",
            });
        } else if (isPasswordValid) {
            validatePasswordMatch(password, confirmPassword);
        }
    };

    // Validate if both passwords match
    const validatePasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setPasswordMatchMessage("Passwords do not match");
            setIsPasswordMatched(false);
            setPasswordError((prev) => ({
                ...prev,
                message: "Passwords do not match",
                color: "#e74c3c",
            }));
            setConfirmPasswordError((prev) => ({
                ...prev,
                message: "Passwords do not match",
                color: "#e74c3c",
            }));
        } else {
            setPasswordMatchMessage("Passwords matched");
            setIsPasswordMatched(true);
            setPasswordError((prev) => ({
                ...prev,
                message: "Passwords matched",
                color: "#2ecc71",
            }));
            setConfirmPasswordError((prev) => ({
                ...prev,
                message: "Passwords matched",
                color: "#2ecc71",
            }));
        }
    };
    const isIOS = () => {
        return (
            ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        );
    };

    return (
        <div
            className='relative w-full mt-[100px] mb-20 md:mt-0 md:h-[calc(100vh_-_70px)] md:mb-0 bg-white flex-col justify-center items-center flex overflow-y-auto'
        >
            <div
                className="relative flex flex-col items-center">
                <span className='text-3xl font-bold'>Hello there!</span>
                <span className='text-base font-semibold'>Register here to be part of our family</span>
            </div>
            <div className="relative">
                <form
                    className='relative'
                >
                    <div className="relative flex flex-col items-center">
                        <div className="group relative flex flex-col md:flex-row md:gap-10">
                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <select
                                    required
                                    id='title'
                                    value={title}
                                    onChange={handleTitleChange}
                                    onBlur={handleTitleBlur}
                                    className="relative w-full bg-white border-2 box-border border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                >
                                    <option value=""></option>
                                    <option value="Mr">Mr</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Mx">Mx</option>
                                    <option value="none">None</option>
                                </select>
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${titleError && isTitleTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isTitleValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Title
                                </label>
                                <span
                                    className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
                                >
                                    {titleError}
                                </span>
                            </div>

                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <input
                                    type="text"
                                    required
                                    id='fullName'
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                    onBlur={handleFullNameBlur}
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                />
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${fullNameError && isFullNameTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isFullNameValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Enter full name
                                </label>
                                <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>{fullNameError}</span>
                            </div>
                        </div>
                        <div className="group relative flex flex-col md:flex-row md:gap-10">
                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <input
                                    type="text"
                                    required
                                    id='username'
                                    value={userName}
                                    onChange={handleUserNameChange}
                                    onBlur={handleUserNameBlur}
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                />
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userNameError && isUserNameTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserNameValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Enter username
                                </label>
                                <span
                                    className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
                                >
                                    {userNameError}
                                </span>
                            </div>
                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <input
                                    type="text"
                                    required
                                    id='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                />
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${emailError && isEmailTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isEmailValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Enter email
                                </label>
                                <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>{emailError}</span>
                            </div>
                        </div>
                        <div className="group relative flex flex-col md:flex-row md:gap-10">
                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <input
                                    type="date"
                                    required
                                    id='dob'
                                    value={dob}
                                    max={today}
                                    onChange={handleDobChange}
                                    onBlur={handleDobBlur}
                                    className={`relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer ${isIOS() ? 'py-7 px-5' : 'py-3 px-5'}`}
                                />
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${dobError && isDobTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isDobValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Enter date of birth
                                </label>
                                <span
                                    className='absolute bottom-0 appearance-none translate-y-6 left-5 font-semibold text-red-500'
                                >
                                    {dobError}
                                </span>
                            </div>
                            <div className="input relative input w-72 md:w-96 mt-8 flex items-center">
                                <select
                                    required
                                    id='userCategory'
                                    value={userCategory}
                                    onChange={handleUserCategoryChange}
                                    onBlur={handleUserCategoryBlur}
                                    className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                >
                                    <option value=""></option>
                                    {/* {categories.map((category) => (
                                        <option key={category.id} value={category.userCategory}>
                                            {category.userCategory}
                                        </option>
                                    ))} */}
                                </select>
                                <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userCategoryError && isUserCategoryTouched ? "" : "hidden"}`} />
                                <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserCategoryValid ? "" : "hidden"}`} />
                                <label
                                    htmlFor="title"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Select user category
                                </label>
                                <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>{userCategoryError}</span>
                            </div>
                        </div>
                        <div className="group relative flex flex-col md:flex-row md:gap-10">
                            <div className={`input relative flex-col input mt-8 flex items-center ${passwordError.message !== "Enter your password" ? "error" : ""}`}>
                                <div className="relative w-72 md:w-96 flex items-center">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className='relative w-full border-2 border-slate-300 rounded-2xl py-3 pl-5 pr-8 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                        required
                                        value={password}
                                        onBlur={handlePasswordBlur}
                                        onChange={handlePasswordChange}
                                    />
                                    {/* <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${passwordError.color === "" ? "" : "hidden"}`}></i> */}
                                    <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${passwordError.message !== "Enter your password" && !isPasswordMatched ? "" : "hidden"}`}></i>
                                    <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isPasswordMatched && isPasswordValid ? "" : "hidden"}`}></i>
                                    {passwordVisible ? (
                                        <i onClick={togglePasswordVisibility}
                                            class="fa-solid fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"></i>
                                    ) : (
                                        <i onClick={togglePasswordVisibility}
                                            class="fa-solid fa-eye-slash absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"></i>
                                    )}
                                    <label
                                        for="password"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter your password
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <span className='top-full lg:w-[350px] phone:w-[300px] flex flex-col items-center'>
                                        <span
                                            className='font-semibold text-slate-500'
                                            style={{ color: passwordError.color }}
                                        >
                                            {passwordError.message}
                                        </span>
                                        <div className="flex justify-between w-[95%] mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-[18%] h-2 bg-slate-300 rounded-md duration-500 ${i < passwordStrength ? "green" : ""}`}
                                                    style={{
                                                        backgroundColor:
                                                            i < passwordStrength ? passwordError.color : "",
                                                    }}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className={`input relative flex-col input mt-8 flex items-center ${confirmPasswordError.message !== "Enter your password" ? "error" : ""}`}>
                                <div className="relative w-72 md:w-96 flex items-center">
                                    <input
                                        type={ConfirmPasswordVisible ? "text" : "password"}
                                        name="confirm_password"
                                        id="confirm_password"
                                        className='relative w-full border-2 border-slate-300 rounded-2xl py-3 pl-5 pr-8 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                        required
                                        value={confirmPassword}
                                        onBlur={handleConfirmPasswordBlur}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    {/* <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${confirmPasswordError.color === "" ? "" : "hidden"}`}></i> */}
                                    <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${confirmPasswordError.message !== "Enter your password" && !isPasswordMatched ? "" : "hidden"}`}></i>
                                    <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isPasswordMatched && isPasswordValid ? "" : "hidden"}`}></i>
                                    {ConfirmPasswordVisible ? (
                                        <i onClick={toggleConfirmPasswordVisibility}
                                            class="fa-solid fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"></i>
                                    ) : (
                                        <i onClick={toggleConfirmPasswordVisibility}
                                            class="fa-solid fa-eye-slash absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"></i>
                                    )}
                                    <label
                                        for="confirm_password"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Confirm password
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <span className='top-full lg:w-[350px] phone:w-[300px] flex flex-col items-center'>
                                        <span
                                            className='font-semibold text-slate-500'
                                            style={{ color: confirmPasswordError.color }}>
                                            {passwordMatchMessage || confirmPasswordError.message}
                                        </span>
                                        <div className="flex justify-between w-[95%] mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-[18%] h-2 bg-slate-300 rounded-md duration-500  ${i < confirmPasswordStrength ? "green" : ""}`}
                                                    style={{
                                                        backgroundColor:
                                                            i < confirmPasswordStrength
                                                                ? confirmPasswordError.color
                                                                : "",
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex phone:w-[300px] md:w-[300px] lg:w-full justify-center mt-5">
                        <div className="relative flex gap-3">
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                onClick={handleTermsCheckboxClick}
                                checked={isTermsAccepted}
                                readOnly
                            />
                            <label htmlFor="terms" className='text-slate-500 phone:text-sm font-medium cursor-pointer hover:text-slate-800 duration-500'>
                                I have read and accept all the terms and conditions.
                            </label>
                        </div>
                        <div className={`fixed top-0 left-0 w-full h-full justify-center items-center ${showTermsPanel ? "flex" : "hidden"}`}>
                            <div className="relative lg:w-[500px] phone:w-[350px] md:w-[400px] lg:h-[700px] phone:h-[700px] md:h-[700px] bg-white shadow-ui-bold flex flex-col ">
                                <div className="top sticky overflow-hidden flex justify-between p-5 border-b-2">
                                    <span className='font-semibold text-slate-600'>Terms and conditions</span>
                                    <i
                                        onClick={() => setShowTermsPanel(false)}
                                        className='fa-solid fa-circle-xmark text-2xl text-red-300 duration-500 hover:text-red-500 cursor-pointer'
                                    />
                                </div>
                                <div className="body px-5 py-2 flex-1 overflow-x-hidden overflow-y-auto">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quis aspernatur hic repellendus maiores eaque eveniet rerum quibusdam quod! Hic quisquam praesentium dolorum veniam quod. Placeat magnam at quo nisi. lorem*100</p>
                                </div>
                                <div className="bottom h-[75px] flex justify-center border-t-2 p-3">
                                    <input
                                        type="button"
                                        value="I agree"
                                        onClick={handleTermsAccepted}
                                        className='border-2 border-slate-400 text-slate-500 rounded-2xl cursor-pointer px-10 hover:bg-slate-700 text-xl font-semibold duration-500 hover:border-transparent hover:text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <input type="submit" value="Register" className='border-2 border-slate-400 text-slate-500 rounded-2xl cursor-pointer px-20 py-4 hover:bg-slate-700 text-xl font-semibold duration-500 hover:border-transparent hover:text-white' />
                    </div>
                    <div className="flex justify-center mt-6 flex-row gap-3">
                        <span className='text-slate-500 font-medium'>Already have account?</span>
                        <Link to="/login" className='text-slate-500 font-medium hover:text-slate-800 duration-500'>Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration