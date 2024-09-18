import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserLogin } from "../../../model/userHandle";
import { ToastContainer, toast, Slide } from 'react-toastify';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [isUserNameTouched, setIsUserNameTouched] = useState(false);
    const [isUserNameValid, setIsUserNameValid] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [errors, setErrors] = useState({ username: false, password: false });

    const navigate = useNavigate();

    const userNameValidate = (value) => {
        if (value.length === 0) {
            setUserNameError("Username cannot be empty.");
            setIsUserNameValid(false);
        } else {
            setUserNameError("");
            setIsUserNameValid(true);
        }
    }
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        if (isUserNameTouched) {
            userNameValidate(e.target.value);
        }
    }
    const handleUserNameBlur = () => {
        setIsUserNameTouched(true);
        userNameValidate(userName);
    }

    const PasswordValidate = (value) => {
        if (value.length === 0) {
            setPasswordError("Password cannot be empty.");
            setIsPasswordValid(false);
        } else if (value.length < 8) {
            setPasswordError("Password must be 8 character");
            setIsPasswordValid(false);
        } else if (value.length > 20) {
            setPasswordError("Password too long");
            setIsPasswordValid(false);
        }
        else {
            setPasswordError("");
            setIsPasswordValid(true);
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (isPasswordTouched) {
            PasswordValidate(e.target.value);
        }
    }
    const handlePasswordBlur = () => {
        setIsPasswordTouched(true);
        PasswordValidate(password);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userName) {
            setErrors((prev) => ({ ...prev, username: true }));
        } else if (!password) {
            setErrors((prev) => ({ ...prev, password: true }));
        } else {
            const result = await UserLogin(userName, password);
            if (result.success) {
                const userData = result.data;
                sessionStorage.setItem("userData", JSON.stringify(userData));
                toast.success("Login successful . . .");
                console.log("UserData pushed");
                console.log("UserData stored in sessionStorage:", sessionStorage.getItem("userData"));


                setTimeout(() => {
                    switch (userData.usercategory) {
                        case "employee":
                            navigate("/employee");
                            break;
                        default:
                            navigate("/users");
                            toast.error("Login Failed! Try again")
                            break;
                    }
                }, 1000);
            } else {
                toast.warning("Please check username and password again.")
                setErrors((prev) => ({ ...prev, password: true }));
            }
        }
    }

    return (
        <div className='relative w-full h-[calc(100vh-65px)] bg-white flex-col justify-center items-center flex'>
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
            <div
                className="relative flex flex-col items-center">
                <span className='text-3xl font-bold'>Welcome Back!</span>
                <span className='text-base font-semibold'>Please login to start your session</span>
            </div>
            <div className="relative">
                <form className='relative' onSubmit={handleLogin}>
                    <div className="relative flex flex-col items-center">
                        <div
                            className="relative input w-72 md:w-96 mt-8 flex items-center"
                        >
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                required
                                value={userName}
                                onChange={handleUserNameChange}
                                onBlur={handleUserNameBlur}
                            />
                            <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${userNameError && isUserNameTouched ? "" : "hidden"}`}></i>
                            <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isUserNameValid ? "" : "hidden"}`}></i>
                            <label
                                for="username"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Enter your username
                            </label>
                            <span
                                className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
                            >
                                {userNameError}
                            </span>
                        </div>
                        <div
                            className="relative input w-72 md:w-96 mt-8 flex items-center"
                        >
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="username"
                                id="username"
                                className='relative w-full border-2 border-slate-300 rounded-2xl py-3 pl-5 pr-8 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                required
                                value={password}
                                onBlur={handlePasswordBlur}
                                onChange={handlePasswordChange}
                            />
                            <i class={`fa-solid fa-circle-exclamation absolute -right-7 text-lg text-red-500 ${passwordError && isPasswordTouched ? "" : "hidden"}`}></i>
                            <i class={`fa-solid fa-circle-check absolute -right-7 text-lg text-green-500 ${isPasswordValid ? "" : "hidden"}`}></i>
                            {passwordVisible ? (
                                <i onClick={togglePasswordVisibility}
                                    class="fa-solid fa-eye absolute right-3 text-slate-600 cursor-pointer"></i>
                            ) : (
                                <i onClick={togglePasswordVisibility}
                                    class="fa-solid fa-eye-slash absolute right-3 text-slate-600 cursor-pointer"></i>
                            )}
                            <label
                                for="username"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Enter your password
                            </label>
                            <span
                                className='absolute bottom-0 translate-y-6 left-5 font-semibold text-red-500'
                            >
                                {passwordError}
                            </span>
                        </div>
                    </div>
                    <div className="forget flex flex-row justify-between mt-8">
                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                className='w-5 cursor-pointer'
                            />
                            <label htmlFor="checkbox"
                                className='text-sm font-semibold md:font-medium md:text-base text-slate-500 cursor-pointer hover:text-black duration-500'
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="forget">
                            <Link to="#"
                                className='text-sm font-semibold md:font-medium md:text-base text-slate-500 cursor-pointer hover:text-black duration-500'
                            >
                                Forget Password?
                            </Link>
                        </div>
                    </div>
                    <div className="button flex items-center justify-center mt-10">
                        <input
                            type="submit"
                            value="Login"
                            className='border-2 py-4 px-20 md:px-32 text-slate-500 rounded-3xl font-semibold text-2xl border-slate-300 cursor-pointer hover:border-black duration-500 hover:shadow-ui-bold hover:text-black'
                        />
                    </div>
                    <div className="loginLink flex items-center justify-between md:justify-center md:gap-5 mt-10">
                        <span
                            className='text-sm font-semibold md:font-medium md:text-base text-slate-500 cursor-pointer hover:text-black duration-500'
                        >
                            Don't Have account?
                        </span>
                        <Link
                            to="/registration"
                            className='text-sm font-semibold md:font-medium md:text-base text-slate-500 cursor-pointer hover:text-black duration-500'
                        >
                            Registration Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
