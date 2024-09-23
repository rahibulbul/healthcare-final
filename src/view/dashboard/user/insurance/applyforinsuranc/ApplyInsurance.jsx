import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { LoginUserData, useRealTimeUserData } from "../../../../../model/handleUser";
import { Link } from 'react-router-dom';

const AppleInsurance = () => {
    const [isDiabetic, setIsDiabetic] = useState('');
    const [isSurgery, setIsSurgery] = useState('');
    const { userData, loading, error } = useRealTimeUserData();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No user data available</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
            <div className="title p-5 flex flex-col fixed h-auto bg-white w-full z-10">
                <div className="w-full h-auto flex flex-col">
                    <span className='text-3xl font-bold text-slate-600'>Apply for insurance</span>
                    <span className='text-base font-medium text-slate-500'>This page is to apply for insurance</span>
                </div>
            </div>
            <div className="flex justify-center w-full fixed mt-20 z-10">
                <div className="progress-bar w-full bg-white h-32 mt-5 items-center flex">
                    <div className="flex w-full justify-around">
                        <div className="flex flex-col items-center">
                            <div className="">1</div>
                            <span>Enter your details</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="">2</div>
                            <span>Choose your cover</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="">3</div>
                            <span>Your quote</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="">4</div>
                            <span>Payment details</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="">5</div>
                            <span>Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="question flex justify-center items-center mt-36">
                <div className="content p-5 w-[80%] flex flex-col justify-center items-center">
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium text-slate-600'>Nice to meet you <span className='text-slate-700 font-semibold'>{userData.title} {userData.fullname}</span>. Who would you like to cover your insurance?</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='userCategory'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Just Me">Just Me</option>
                                <option value="Me and my partner">Me and my partner</option>
                                <option value="Me partner and my children">Me partner and my children</option>
                                <option value="Me and my children">Me and my children</option>
                            </select>
                            <label
                                htmlFor="title"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                I want to cover for . . .
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn hidden">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Please check your date of birth</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <input
                                type="date"
                                required
                                id='dob'
                                value={userData.dob}
                                disabled
                                className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            />
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Please check your address</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <input
                                type="text"
                                required
                                id='address'
                                value={userData.address}
                                disabled
                                className="relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            />
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Self Declaration</span>
                        <span className='w-1/2 mt-2 flex items-center'>
                            I am a UK resident (including the Channel Islands and the Isle of Man). I have been registered with a UK GP for at least 6 months and can supply complete medical records in English. I do not get any compensation, bursaries, or costs for participating in professional sports.
                        </span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='self-declaration'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="title"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Self Declaration . . .
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration</span>
                        <div className="'w-full mt-2 flex flex-col items-center">
                            <span className='w-2/3 text-justify mt-3'>
                                Medical issues that existed prior to the commencement date of your coverage are often not covered. This is how most health insurance plans work.
                            </span>
                            <span className='w-2/3 text-justify mt-3'>We'll inquire about your medical history after you've purchased your coverage. If you're purchasing joint or family insurance, we'll inquire about everyone else so we can let you know if any problems aren't covered.</span>
                            <span className='w-2/3 text-justify mt-3'>We need this information as soon as possible to avoid delays in processing your claim.</span>
                            <span className='w-2/3 text-justify mt-3'>Your medical history will not impact the pricing.</span>
                            <span className='w-2/3 text-justify mt-3 text-xl font-semibold'>You agree with that?</span>
                        </div>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='self-declaration'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="title"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                You agree with that?
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration 1</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='medical-declaration-1'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes, but no earlier than two years">Yes, but no earlier than two years</option>
                                <option value="Yes, regularly for more than two years">Yes, regularly for more than two years</option>
                                <option value="No, I stopped two years ago">No, I stopped two years ago</option>
                                <option value="No, I never smoke">No, I never smoke</option>
                            </select>
                            <label
                                htmlFor="medical-declaration-1"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Do you smoke?
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration 2</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='medical-declaration-2'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="medical-declaration-2"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Do you have heart disease?
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration 3</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='medical-declaration-3'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                value={isDiabetic}
                                onChange={(e) => setIsDiabetic(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="medical-declaration-3"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Are you a diabetic patient?
                            </label>
                        </div>
                        {isDiabetic === "Yes" && (
                            <div className="input relative input w-[50%] mt-8 flex items-center">
                                <select
                                    required
                                    id='pre-diabetes'
                                    className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                                >
                                    <option value=""></option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <label
                                    htmlFor="pre-diabetes"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Have you been treated for pre-diabetes or diabetes during the previous two years?
                                </label>
                            </div>
                        )}
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration 4</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                id='medical-declaration-4'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="medical-declaration-4"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Do you have a BMI of 18.5-24.9?
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Medical Condition Declaration 5</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <select
                                required
                                value={isSurgery}
                                onChange={(e) => setIsSurgery(e.target.value)}
                                id='medical-declaration-5'
                                className="relative w-full border-2 bg-white border-slate-300 cursor-pointer rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer"
                            >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <label
                                htmlFor="medical-declaration-5"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                Have you done any surgery recently?
                            </label>
                        </div>
                        {isSurgery === "Yes" && (
                            <div className="input relative input w-[50%] mt-8 flex items-center">
                                <input
                                    type="text"
                                    name="surgery"
                                    id="surgery"
                                    className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                    required
                                />
                                <label
                                    for="surgery"
                                    className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                                >
                                    Please tell us about your recent surgery
                                </label>
                            </div>
                        )}
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Policy start date</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <input
                                type="date"
                                name="date"
                                id="date"
                                className='relative w-full border-2 border-slate-300 rounded-2xl py-3 px-5 font-semibold outline-none focus:border-slate-700 focus:shadow-ui-bold valid:border-slate-700 duration-500 peer'
                                required
                            />
                            <label
                                for="date"
                                className='absolute left-0 ml-5 px-2 font-semibold text-slate-500 bg-white pointer-events-none top-1/2 -translate-y-2/4 transform peer-focus:top-0 peer-valid:top-0 peer-focus:text-black peer-valid:text-black duration-500 text-base'
                            >
                                When do you want your policy to start?
                            </label>
                        </div>
                        <div className="mt-16 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col w-full justify-center items-center">
                        <span className='text-2xl font-medium'>Please check your contact information</span>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className='relative w-full border-2 rounded-2xl py-3 px-5 font-semibold outline-none border-slate-700 duration-500 peer'
                                readOnly
                                value={userData.email}
                            />
                            <label
                                for="email"
                                className='absolute left-0 ml-5 px-2 font-semibold bg-white pointer-events-none  -translate-y-2/4 transform top-0 text-black duration-500 text-base'
                            >
                                Your email
                            </label>
                        </div>
                        <div className="input relative input w-[50%] mt-8 flex items-center">
                            <input
                                type="text"
                                name="phonenumber"
                                id="phonenumber"
                                className='relative w-full border-2 rounded-2xl py-3 px-5 font-semibold outline-none border-slate-700 duration-500 peer'
                                readOnly
                                value={userData.phonenumber}
                            />
                            <label
                                for="phonenumber"
                                className='absolute left-0 ml-5 px-2 font-semibold bg-white pointer-events-none  -translate-y-2/4 transform top-0 text-black duration-500 text-base'
                            >
                                Your phonenumber
                            </label>
                        </div>
                        <div className="mt-4">
                            <span className='text-slate-500 mr-2'
                            >If your contact information is not correct then please visit
                            </span>
                            <Link
                                className='text-slate-500 font-semibold cursor-pointer hover:text-slate-700 duration-300'
                                to="/users/profilesettings"
                            >Profile Setting
                            </Link>
                        </div>
                        <div className="mt-14 flex gap-20">
                            <div className="back-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className="next-btn">
                                <button className='relative flex gap-2 text-2xl items-center px-10 py-3 border-2 rounded-full border-slate-600 cursor-pointer hover:bg-slate-600 hover:text-white font-medium duration-500'>
                                    <span>Next</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AppleInsurance

