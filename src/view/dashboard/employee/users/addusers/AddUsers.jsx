import React, { useState } from 'react'
import { UseUserCategories, UserRegistration, findingUserName } from "../../../../../model/userHandle";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EMPAddUsers = () => {
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
    const categories = UseUserCategories();

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const [occupation, setOccupation] = useState("");
    const [occupationError, setOccupationError] = useState("");
    const [isOccupationTouched, setIsOccupationTouched] = useState(false);
    const [isOccupationValid, setIsOccupationValid] = useState(false);

    const [postcode, setPostcode] = useState("");
    const [postcodeError, setPostcodeError] = useState("");
    const [isPostcodeTouched, setIsPostcodeTouched] = useState(false);
    const [isPostcodeValid, setIsPostcodeValid] = useState(false);

    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [isAddressTouched, setIsAddressTouched] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];


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

    // Phone
    const ValidatePhone = (value) => {
        if (value.length === 0) {
            setPhoneError("Phone Number cannot be empty");
            setIsPhoneValid(false);
        } else if (value.length < 11) {
            setPhoneError("Phone number must be at least 11 character (0 included).");
            setIsPhoneValid(false);
        } else {
            setPhoneError("");
            setIsPhoneValid(true);
        }
    }

    const handlePhoneChange = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 11) {
            input = input.slice(0, 11);
        }
        setPhone(input);
        if (isPhoneTouched) {
            ValidatePhone(input);
        }
    };

    const handlePhoneBlur = () => {
        setIsPhoneTouched(true);
        ValidatePhone(phone);
    }

    // Occupation
    const ValidateOccupation = (value) => {
        if (value.length === 0) {
            setOccupationError("Occupation cannot be empty");
            setIsOccupationValid(false);
        } else if (value.length < 3) {
            setOccupationError("Occupation must be at least 3 letter.");
            setIsOccupationValid(false);
        } else {
            setOccupationError("");
            setIsOccupationValid(true);
        }
    }

    const handleOccupationChange = (e) => {
        setOccupation(e.target.value);
        if (isOccupationTouched) {
            ValidateOccupation(e.target.value);
        }
    }

    const handleOccupationBlur = () => {
        setIsOccupationTouched(true);
        ValidateOccupation(occupation);
    }

    // Postcode
    const ValidatePostcode = (value) => {
        if (value.length === 0) {
            setPostcodeError("Postcode cannot be empty");
            setIsPostcodeValid(false);
        } else if (value.length < 6) {
            setPostcodeError("Postcode must be at least 6 character.");
            setIsPostcodeValid(false);
        } else {
            setPostcodeError("");
            setIsPostcodeValid(true);
        }
    }

    const handlePostcodeChange = (e) => {
        let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (input.length > 3) {
            input = input.slice(0, 3) + ' ' + input.slice(3);
        }
        setPostcode(input);
        if (isPostcodeTouched) {
            ValidatePostcode(input);
        }
    };


    const handlePostcodeBlur = () => {
        setIsPostcodeTouched(true);
        ValidatePostcode(postcode);
    }

    // Address
    const ValidateAddress = (value) => {
        if (value.length === 0) {
            setAddressError("Address cannot be empty");
            setIsAddressValid(false);
        } else if (value.length < 3) {
            setAddressError("Address must be at least 3 letter.");
            setIsAddressValid(false);
        } else {
            setAddressError("");
            setIsAddressValid(true);
        }
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if (isAddressTouched) {
            ValidateAddress(e.target.value);
        }
    }

    const handleAddressBlur = () => {
        setIsAddressTouched(true);
        ValidateAddress(address);
    }

    // Username
    const validateUsername = async (value) => {
        if (value.length === 0) {
            setUserNameError("Username cannot be empty.");
            setIsUserNameValid(false);
        } else if (value.length < 3) {
            setUserNameError("Username must be at least 3 letters.");
            setIsUserNameValid(false);
        } else {
            const UserNameAvailable = await findingUserName(value);
            if (UserNameAvailable) {
                setUserNameError("Username is available");
                setIsUserNameValid(true);
            } else {
                setUserNameError("Username is already taken");
                setIsUserNameValid(false);
            }
            // setUserNameError("");
            // setIsUserNameValid(true);
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

    const isIOS = () => {
        return (
            ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        );
    };

    const HandleRegistration = async (e) => {
        e.preventDefault();

        if (isSubmiting) return;
        setIsSubmiting(true);

        // const isUserCategoryValid = validateUserCategory(userCategory);

        console.log("Title Valid:", isTitleValid);
        console.log("Full Name Valid:", isFullNameValid);
        console.log("Username Valid:", isUserNameValid);
        console.log("Email Valid:", isEmailValid);
        console.log("DOB Valid:", isDobValid);
        console.log("User Category Valid:", isUserCategoryValid);

        if (
            isTitleValid &&
            isFullNameValid &&
            isUserNameValid &&
            isEmailValid &&
            isDobValid &&
            isUserCategoryValid
        ) {
            try {
                const currentDate = new Date();
                const year = currentDate.getFullYear().toString();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
                const dayOfMonth = currentDate.getDate();
                const week = Math.ceil(dayOfMonth / 7).toString();

                const userPrefix = userCategory.slice(0, 2).toUpperCase();

                const userData = {
                    title: title,
                    fullname: fullName,
                    username: userName,
                    email: email,
                    recoveryemail: "",
                    dob: dob,
                    gender: "",
                    race: "",
                    religion: "",
                    usercategory: userCategory,
                    password: "",
                    occupation: occupation,
                    address: address,
                    phonenumber: phone,
                    recoveryphonenumber: "",
                    profilepicture: "",
                    family: [
                        {
                            name: "",
                            relationship: "",
                            dob: "",
                            phonenumber: "",
                            address: "",
                        }
                    ],
                    monthlyincome: 0,
                    yearlyincome: 0,
                    nhsnumber: "",
                    registeredhospital: "",
                    registeredpharmacy: "",
                    registereddoctor: "",
                    medicalhistorys: [
                        {
                            medicalhistoryid: "",
                            medicalhistorytype: "",
                            medicalhistorydate: "",
                            medicalhistory: [],
                        }
                    ],
                    medicalreports: [
                        {
                            medicalreportid: "",
                            medicalreporttype: "",
                            medicalreportdate: "",
                            medicalreport: [],
                        }
                    ],
                    insurancestatus: "None",
                    insurancestartdate: "",
                    insuranceenddate: "",
                    insuranceprovider: "",
                    insurancepolicynumber: "",
                    insuranceplantype: "",
                    insuranceclaim: [
                        {
                            insuranceclaimid: "",
                            claimstartdate: "",
                            claimenddate: "",
                            reason: "",
                            insuranceprovider: "",
                        }
                    ],
                    insurancepaids: [
                        {
                            insurancepaidid: "",
                            insurancepaiddate: "",
                            insurancepaidamount: "",
                            insurancepaidnextdate: "",
                        }
                    ],
                    totalinsuranceclaim: 0,
                    totalinsurancepaid: 0,
                    insuranceCoverage: "",
                    doctorappointments: [
                        {
                            doctorappointmentsid: "",
                            doctorappointmentsplace: "",
                            doctorappointmentsdate: "",
                            doctorappointmentsreason: "",
                        }
                    ],
                    appointments: [
                        {
                            appointmentsid: "",
                            appointmentsplace: "",
                            appointmentsdate: "",
                            appointmentsreason: "",
                        }
                    ],
                    hospitalappointments: [
                        {
                            hospitalappointmentsid: "",
                            hospitalappointmentsplace: "",
                            hospitalappointmentsdate: "",
                            hospitalappointmentsreason: "",
                        }
                    ],
                    lastAppointmentDate: "",
                    nextAppointmentDate: "",
                    bloodType: "",
                    allergies: [],
                    currentMedications: [],
                    primaryDoctor: "",
                    emergencycontact: [
                        {
                            name: "",
                            relation: "",
                            phone: "",
                        }
                    ],
                    accountstatus: "awaiting verifying",
                    lastUpdated: Date.now(),
                };
                await UserRegistration(userData, userCategory, year, month, week, userPrefix);

                setTitle("");
                setFullName("");
                setUserName("");
                setEmail("");
                setUserCategory("");
                setDob("");
                setPhone("");
                setOccupation("");
                setAddress("");
                toast.success("Your registration done. Redirecting ....")
                setTimeout(() => {
                    navigate("/employee/allusers");
                }, 2000);
            } catch (error) {
                console.log(error.message);
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.warning("Please fix all the errors and fill out the form.");
        }
        setIsSubmiting(false);
    }
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
            <div className="title p-5 flex flex-col fixed h-28 bg-white w-full z-10">
                <span className='text-3xl font-bold text-slate-600'>Register new users</span>
                <span className='text-base font-medium text-slate-500'>This page is to register new user to the company</span>
            </div>
            <div className="content p-5 w-full mt-20 overflow-hidden overflow-y-auto">
                <div className="relative w-full">
                    <form
                        className='relative'
                        onSubmit={HandleRegistration}
                    >
                        <div className="relative w-full flex flex-col items-center">
                            <div className="group relative w-[90%] flex flex-col md:flex-row md:gap-10">
                                <div className="input relative input w-full mt-8 flex items-center">
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

                                <div className="input relative input w-full mt-8 flex items-center">
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
                            <div className="group relative w-[90%] flex flex-col md:flex-row md:gap-10">
                                <div className="input relative input w-full mt-8 flex items-center">
                                    <input
                                        type="text"
                                        required
                                        id='username'
                                        value={userName}
                                        onChange={handleUserNameChange}
                                        onBlur={handleUserNameBlur}
                                        className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    />
                                    <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userNameError && isUserNameTouched && !isUserNameValid ? "" : "hidden"}`} />
                                    <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserNameValid ? "" : "hidden"}`} />
                                    <label
                                        htmlFor="username"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter username
                                    </label>
                                    <span
                                        className={`absolute bottom-0 translate-y-6 left-5 font-semibold ${isUserNameValid ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {userNameError}
                                    </span>
                                </div>
                                <div className="input relative input w-full mt-8 flex items-center">
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
                            <div className="group relative w-[90%] flex flex-col md:flex-row md:gap-10">
                                <div className="input relative input w-full mt-8 flex items-center">
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
                                <div className="input relative input w-full mt-8 flex items-center">
                                    <select
                                        required
                                        id='userCategory'
                                        value={userCategory}
                                        onChange={handleUserCategoryChange}
                                        onBlur={handleUserCategoryBlur}
                                        className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    >
                                        <option value=""></option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.usercategory}>
                                                {category.usercategory}
                                            </option>
                                        ))}
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
                            <div className="group relative w-[90%] flex flex-col md:flex-row md:gap-10">
                                <div className="input relative input w-full mt-8 flex items-center">
                                    <input
                                        type="text"
                                        required
                                        id='phone'
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        onBlur={handlePhoneBlur}
                                        className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    />
                                    <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${phoneError && isPhoneTouched && !isPhoneValid ? "" : "hidden"}`} />
                                    <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isPhoneValid ? "" : "hidden"}`} />
                                    <label
                                        htmlFor="phone"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter phone number
                                    </label>
                                    <span
                                        className={`absolute bottom-0 translate-y-6 left-5 font-semibold ${isPhoneValid ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {phoneError}
                                    </span>
                                </div>
                                <div className="input relative input w-full mt-8 flex items-center">
                                    <input
                                        type="text"
                                        required
                                        id='occupation'
                                        value={occupation}
                                        onChange={handleOccupationChange}
                                        onBlur={handleOccupationBlur}
                                        className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    />
                                    <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${occupationError && isOccupationTouched ? "" : "hidden"}`} />
                                    <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isOccupationValid ? "" : "hidden"}`} />
                                    <label
                                        htmlFor="title"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter occupation
                                    </label>
                                    <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>{occupationError}</span>
                                </div>
                            </div>
                            <div className="group relative w-[90%] flex flex-col md:flex-row md:gap-10">
                                {/* <div className="input relative input w-full md:w-[50%] mt-8 flex items-center">
                                    <input
                                        type="text"
                                        required
                                        id='postcode'
                                        value={postcode}
                                        onChange={handlePostcodeChange}
                                        onBlur={handlePostcodeBlur}
                                        className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    />
                                    <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${postcodeError && isPostcodeTouched ? "" : "hidden"}`} />
                                    <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isPostcodeValid ? "" : "hidden"}`} />
                                    <label
                                        htmlFor="title"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter postcode
                                    </label>
                                    <span className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'>{postcodeError}</span>
                                </div> */}
                                <div className="input relative input w-full mt-8 flex items-center">
                                    <input
                                        type="text"
                                        required
                                        id='address'
                                        value={address}
                                        onChange={handleAddressChange}
                                        onBlur={handleAddressBlur}
                                        className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                    />
                                    <i className={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${addressError && isAddressTouched && !isAddressValid ? "" : "hidden"}`} />
                                    <i className={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isAddressValid ? "" : "hidden"}`} />
                                    <label
                                        htmlFor="address"
                                        className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                    >
                                        Enter full address
                                    </label>
                                    <span
                                        className={`absolute bottom-0 translate-y-6 left-5 font-semibold ${isAddressValid ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {addressError}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-16">
                            <input type="submit" value="Add new user" className='border-2 border-slate-400 text-slate-500 rounded-2xl cursor-pointer px-20 py-4 hover:bg-slate-700 text-xl font-semibold duration-500 hover:border-transparent hover:text-white' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EMPAddUsers

