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
import NewUserPage from "./view/webPage/newuser/Newuser";
// EMployee Dashboard
import EmpHome from "./view/dashboard/employee/home/EmpHome"
import EMPAddUsers from "./view/dashboard/employee/users/addusers/AddUsers";
import EMPAllUsers from "./view/dashboard/employee/users/allusers/AllUsers";
import EMPAwaitingUsers from "./view/dashboard/employee/users/awaitingusers/AwaitingUsers";
import EMPUserCategory from "./view/dashboard/employee/users/userscategory/UserCategory";

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
                            <NewUserPage />
                        </LoginRegistrationLayOut>
                    }
                />
                <Route
                    path="/employee/*"
                    element={
                        <EmployeeDashLayout>
                            <Routes>
                                <Route index element={<EmpHome />} />
                                <Route path="allusers" element={<EMPAllUsers />} />
                                <Route path="addusers" element={<EMPAddUsers />} />
                                <Route path="userscategory" element={<EMPUserCategory />} />
                                <Route path="awaitingusers" element={<EMPAwaitingUsers />} />
                            </Routes>
                        </EmployeeDashLayout>
                    }
                />
            </Routes>
        </Router>
    );
};


export default AppRoutes;