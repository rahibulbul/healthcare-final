import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// All Components
import WebNavbar from "./components/webNavbar/WebNavbar";
import DashNavbar from "./components/dashNavbar/DashNavbar";
import DashSidebar from "./components/dashSidebar/DashSidebar";
// Web Page
import WebHome from "./view/webPage/home/Home";
import Login from "./view/webPage/login/Login"
import Registration from "./view/webPage/registration/Registration";
// EMployee Dashboard
import EmpHome from "./view/dashboard/employee/home/EmpHome"

const WebPageLayOut = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <WebNavbar />
            {children}
        </>
    );
};

const LoginRegistrationLayOut = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <WebNavbar />
            {children}
        </>
    );
};

const EmployeeDashLayout = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <div className="flex w-full h-screen flex-row overflow-hidden">
                <div className="flex w-fit h-screen">
                    <DashSidebar />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="">
                        <DashNavbar />
                    </div>
                    <div className="w-full flex overflow-hidden overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};




const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <WebPageLayOut>
                            <WebHome />
                        </WebPageLayOut>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <LoginRegistrationLayOut>
                            <Login />
                        </LoginRegistrationLayOut>
                    }
                />
                <Route
                    path="/registration"
                    element={
                        <LoginRegistrationLayOut>
                            <Registration />
                        </LoginRegistrationLayOut>
                    }
                />
                <Route
                    path="/newuser"
                    element={
                        <LoginRegistrationLayOut>

                        </LoginRegistrationLayOut>
                    }
                />
                <Route
                    path="/employee/*"
                    element={
                        <EmployeeDashLayout>
                            <Routes>
                                <Route index element={<EmpHome />} />
                                {/* <Route path="alluser" element={<UserList />} />
                                <Route path="newuser" element={<NewUsers />} />
                                <Route path="usercategory" element={<UserCategory />} />
                                <Route path="awaitinguser" element={<AwaitingUser />} />
                                <Route path="patientslist" element={<PatientList />} />
                                <Route path="newpatients" element={<NewPatient />} />
                                <Route path="awaitingpatients" element={<AwaitingPatient />} />
                                <Route path="newappointments" element={<NewAppointments />} />
                                <Route path="appointmentslist" element={<AppointmentList />} /> */}
                            </Routes>
                        </EmployeeDashLayout>
                    }
                />
            </Routes>
        </Router>
    );
};


export default AppRoutes;